from dao.inmemory import save_user, get_user
from flask import request, Blueprint, make_response, jsonify
from flask_login import login_required, current_user, login_user
from models.User import User
from models.Plan import PlanEnum, Plan, parse_plan_enum

### BEGIN Constants ###
### END Constants ###

### BEGIN init ###
### END init ###

purchase_bp = Blueprint("purchase", __name__)


@purchase_bp.route("/purhcase", methods=["POST"])
@login_required
def make_purchase():
    try:
        planCode = request.json.get("planCode")
        try:
            plan = parse_plan_enum(planCode)
        except ValueError:
            return make_response("", 400)
        user = get_user(current_user.id)
        user.plan = current_user.plan = plan.name
        save_user(user)
        return make_response(user.toJSON(), 200)
    except Exception as ex:
        print(ex)
        return make_response("", 501)
