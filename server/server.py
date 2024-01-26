import os
import pathlib
from flask import Flask
import os
from blueprints.auth import auth_bp
from blueprints.test_protected_api import protected_area_bp
from flask_login import LoginManager

# TODO: Flag Based Check.
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

app = Flask("Memories")

# TODO: Read from configuration.
app.secret_key = os.urandom(12)

app.register_blueprint(auth_bp)
app.register_blueprint(protected_area_bp)

if __name__ == "__main__":
    app.run(debug=True)
