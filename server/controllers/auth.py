import os
import pathlib
import json

import requests
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
import os

from flask import session, abort, redirect, request, Blueprint
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
        name=id_info.get("name"),
        picture_url=id_info.get("picture"),
        locale=id_info.get("locale"),
        email_id=id_info.get("email"),
    )
    session["user"] = gmail_user.to_json()
    return redirect("/protected_area")


@auth_bp.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@auth_bp.route("/")
def index():
    return "Hello World <a href='/login'><button>Login</button></a>"
