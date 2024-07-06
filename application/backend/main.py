from flask import Flask, render_template, jsonify
import os

##########

REACT_PATH = os.path.abspath("../frontend/build")
app = Flask(
    __name__, static_folder=REACT_PATH, template_folder=REACT_PATH, static_url_path="/"
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/getEmailConfig")
def get_email_config():
    resp = {
        "service_id": os.environ["REACT_APP_EMAIL_SERVICE"],
        "template_id": os.environ["REACT_APP_EMAIL_TEMPLATE"],
        "public_key": os.environ["REACT_APP_EMAIL_PUBLIC_KEY"],
    }

    return jsonify(resp)
