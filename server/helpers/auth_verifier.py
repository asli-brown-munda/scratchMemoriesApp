from flask import session

def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "user" not in session:
            return abort(401)  # Authorization required
        else:
            return function()
    return wrapper
