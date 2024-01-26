from flask import session, Blueprint
from models.User import User
from flask_login import (
    current_user,
    login_required,
)

protected_area_bp = Blueprint("protected_area", __name__)


@protected_area_bp.route("/protected_area")
@login_required
def protected_area():
    return (
        f"Hello {current_user.name} @ {current_user.email_id}! <br/> <a href='/logout'><button>Logout</button></a>"
    )