import os
import pathlib
import json

import requests
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
import os

from dao.inmemory import save_user, get_user
from flask import session, abort, redirect, request, Blueprint
from flask_login import (
    LoginManager,
    login_required,
    login_user,
    logout_user,
)
from models.User import User

### BEGIN Constants ###
GOOGLE_CLIENT_ID = (
    "121036537289-qhgeejlfbbp3d177dm5l330crn1dn9ci.apps.googleusercontent.com"
)
client_secrets_file = os.path.join(
    pathlib.Path(__file__).parent.parent, "data", "client_secret.json"
)
### END Constants ###

### BEGIN init ###
login_manager = LoginManager()  # Login Manager Init.
flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
    ],
    redirect_uri="http://127.0.0.1:5000/callback",
)
### END init ###

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)


@auth_bp.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)
    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token, request=token_request, audience=GOOGLE_CLIENT_ID
    )

    gmail_user = User(
        id=id_info.get("email"),
        name=id_info.get("name"),
        picture_url=id_info.get("picture"),
        locale=id_info.get("locale"),
        email_id=id_info.get("email"),
    )
    save_user(gmail_user)
    login_user(gmail_user)
    return redirect("/protected_area")


@auth_bp.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/")


@auth_bp.route("/")
def index():
    return "Hello World <a href='/login'><button>Login</button></a>"


@login_manager.user_loader
def load_user(user_id):
    return get_user(user_id)


@auth_bp.record_once
def on_load(state):
    # This function is called when the blueprint is loaded
    # It allows us to access the application object
    app = state.app
    login_manager.init_app(app)
