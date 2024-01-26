import os
import pathlib
from flask import Flask
import os
from controllers.auth import auth_bp
from controllers.test_protected_api import protected_area_bp

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
app = Flask("Memories")
app.secret_key = os.urandom(12)

app.register_blueprint(auth_bp)
app.register_blueprint(protected_area_bp)

if __name__ == "__main__":
    app.run(debug=True)
