from flask import Flask

app = Flask(__name__)


@app.route("/members")
def members():
    return {"members": ["shubham sharma"]}

if __name__ == "__main__":
    app.run(debug=True)

