from flask import session, Blueprint
from helpers.auth_verifier import login_is_required 
from models.User import User

protected_area_bp = Blueprint("protected_area", __name__)


@protected_area_bp.route("/protected_area")
@login_is_required
def protected_area():
    print(session['user'])
    user = User.from_json(session['user'])
    return (
        f"Hello {user.name} @ {user.email_id}! <br/> <a href='/logout'><button>Logout</button></a>"
    )