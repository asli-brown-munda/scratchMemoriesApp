from flask import make_response, Blueprint, jsonify
from models.User import User
from flask_login import (
    current_user,
    login_required,
)

protected_area_bp = Blueprint("protected_area", __name__)


@protected_area_bp.route("/protected_area", methods=["POST"])
@login_required
def protected_area():
    return make_response(current_user.toJSON(), 200)
