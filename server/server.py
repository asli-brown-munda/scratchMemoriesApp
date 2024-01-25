import os
import pathlib
from flask import Flask
import os
from blueprints.auth import auth_bp
from blueprints.test_protected_api import protected_area_bp
from flask_login import LoginManager
from blueprints.node import node_bp
from flask_injector import FlaskInjector, inject, singleton
from dao.nodeDAO import NodeHierarchy
import boto3

# TODO: Flag Based Check.
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

app = Flask("Memories")

# TODO: Read from configuration.
app.secret_key = os.urandom(12)

app.register_blueprint(auth_bp)
app.register_blueprint(protected_area_bp)
app.register_blueprint(node_bp)

##Move to config file
def configure(binder):
    binder.bind(NodeHierarchy, to=NodeHierarchy(boto3.resource("dynamodb", region_name="ap-south-1")), scope=singleton)
FlaskInjector(app=app, modules=[configure])

if __name__ == "__main__":
    app.run(debug=True)
