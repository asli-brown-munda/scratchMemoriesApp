from dao.user_dao import UserDao
from flask import request, Blueprint, make_response, jsonify
from flask_login import login_required, current_user
from models.Plan import parse_plan_enum

### BEGIN Constants ###
### END Constants ###

### BEGIN init ###
### END init ###

purchase_bp = Blueprint("purchase", __name__)

@purchase_bp.route("/mark_interest", methods=["POST"])
@login_required
def make_purchase(user_dao: UserDao):
    try:
        user = user_dao.getUserById(current_user.id)
        user.has_interest_in_premium_plans = current_user.has_interest_in_premium_plans = True
        user_dao.createUser(user)
        return make_response(user.toJSON(), 200)
    except Exception as ex:
        print(ex)
        return make_response("", 501)


#@purchase_bp.route("/purchase", methods=["POST"])
#@login_required
def make_purchase(user_dao: UserDao):
    try:
        planCode = request.json.get("planCode")
        try:
            plan = parse_plan_enum(planCode)
        except ValueError:
            return make_response("", 400)
        user = user_dao.getUserById(current_user.id)
        user.plan = current_user.plan = plan.name
        user_dao.createUser(user)
        return make_response(user.toJSON(), 200)
    except Exception as ex:
        print(ex)
        return make_response("", 501)
