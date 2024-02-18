import os
import pathlib

from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from models.Plan import Plan, PlanEnum
import google.auth.transport.requests
import os
from flask_injector import inject
from dao.user_dao import UserDao
from flask import request, Blueprint, make_response
from flask_login import (
    login_required,
    login_user,
    logout_user,
)
from models.User import User
from models.Node import Node
import uuid
import logging
from flask import current_app
from dao.nodeDAO import NodeHierarchy
import time

### BEGIN Constants ###
GOOGLE_CLIENT_ID = (
    "121036537289-qhgeejlfbbp3d177dm5l330crn1dn9ci.apps.googleusercontent.com"
)
client_secrets_file = os.path.join(
    pathlib.Path(__file__).parent.parent, "data", "client_secret.json"
)
### END Constants ###

### BEGIN init ###
flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
    ],
    redirect_uri="http://127.0.0.1:5000/callback",
)
logger = logging.getLogger(__name__)
### END init ###

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login/google", methods=["POST"])
@inject
def login_gmail_user(user_dao: UserDao, nodeHierarchy: NodeHierarchy):
    try:
        token = request.json.get("token")
        token_request = google.auth.transport.requests.Request()

        id_info = id_token.verify_oauth2_token(
            id_token=token, request=token_request, audience=GOOGLE_CLIENT_ID
        )
        logging.info("Received Google ID: %s", str(id_info))
        saved_user = user_dao.getUserByEmail(id_info.get("email"))
        if saved_user is None or len(saved_user) == 0:
            gmail_user = User(
                id=str(uuid.uuid4()),
                name=id_info.get("name"),
                picture_url=id_info.get("picture"),
                locale=id_info.get("locale"),
                email_id=id_info.get("email"),
                plan=PlanEnum.FREE_PLAN.name,
                storage_used=0,
                download_used=0
            )
            logging.info("Creating a new User: %s", gmail_user.toJSON())
            user_dao.createUser(gmail_user)

            root_node = Node(
                id=str(uuid.uuid4()),
                name="root",
                parent_id=gmail_user.id + "#root",
                parent_name="",
                type="folder",
                metadata={"size": 0},
                created_at=round(time.time() * 1000),
            )
            logging.info("Creating a default Root Node: %s", root_node.to_json())
            nodeHierarchy.createNode(gmail_user.id, root_node)

            final_user = gmail_user
        else:
            final_user = saved_user[0]
            logging.info("Found an existing User: %s", final_user.toJSON())
        login_user(final_user)
        userString = final_user.toJSON()
        return make_response(userString, 200)
    except Exception as ex:
        print(ex)
        return make_response("", 500)

@auth_bp.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return make_response({"success": True}, 200)
