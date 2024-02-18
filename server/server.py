import logging
import os
from absl import app
from absl import flags
from flask import Flask
from blueprints.auth import auth_bp
from blueprints.purchase import purchase_bp
from blueprints.test_protected_api import protected_area_bp
from blueprints.node import node_bp
from blueprints.fileDownloadUpload import file_bp
from flask_injector import FlaskInjector, inject, singleton
from flask_cors import CORS
from dao.nodeDAO import NodeHierarchy
import boto3
from dao.s3Accessor import S3Accessor
from botocore.client import Config
from dotenv import load_dotenv
from dao.secretAccessor import get_secret
from dao.user_dao import UserDao
from flask_login import LoginManager

__ENVIRONMENT = flags.DEFINE_enum('environment', 'dev', ['dev', 'prod'], 'specify which environment you are running the server on dev or prod', short_name='e')

logger = logging.getLogger(__name__)
login_manager = LoginManager()  # Login Manager Init.
USER_DAO_SINGLETON = UserDao(boto3.resource("dynamodb", region_name="us-east-1"))

##Move to config file
def configure(binder):

    binder.bind(
        NodeHierarchy,
        to=NodeHierarchy(boto3.resource("dynamodb", region_name="ap-south-1")),
        scope=singleton,
    )
    storj_secret = get_secret('prod/storj')
    binder.bind(
        S3Accessor,
        to=S3Accessor(boto3.client("s3", aws_access_key_id=storj_secret['ACCESS_KEY'], aws_secret_access_key=storj_secret['SECRET_KEY'], endpoint_url = "https://gateway.storjshare.io", config=Config(signature_version='s3v4'))),
        scope=singleton,
    )
    binder.bind(
        UserDao,
        to=USER_DAO_SINGLETON,
        scope=singleton,
    )

def main(argv):
    flask_app = Flask("Memories")
    CORS(flask_app, supports_credentials=True)
    if __ENVIRONMENT.value == 'dev':
        flask_app.secret_key = os.urandom(12)
        logging.info("Setting the Secret Key to a Random Key, Detected Environment Dev")
    else:
        flask_app.secret_key = get_secret('prod/appconfig')['flask_secret_key'].encode('utf-8')
        logging.info("Secret Key pulled from Secrets.")
    flask_app.register_blueprint(auth_bp, url_prefix='/api')
    flask_app.register_blueprint(protected_area_bp, url_prefix='/api')
    flask_app.register_blueprint(purchase_bp, url_prefix='/api')
    flask_app.register_blueprint(node_bp, url_prefix='/api')
    flask_app.register_blueprint(file_bp, url_prefix='/api')

    FlaskInjector(app=flask_app, modules=[configure])
    login_manager.init_app(flask_app)

    if __ENVIRONMENT.value == 'dev':
        flask_app.run(debug=True)
    else:
        flask_app.run()

@login_manager.user_loader
def load_user(user_id):
    return USER_DAO_SINGLETON.getUserById(user_id=user_id)

if __name__ == "__main__":
    app.run(main)
