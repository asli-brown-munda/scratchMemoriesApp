from flask import Blueprint, make_response

health_check = Blueprint('health_check', __name__)

@health_check.route("/all_ok")
def all_ok():
    return make_response({"success": True}, 200)
