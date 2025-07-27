from flask import Flask, render_template
import os

##########

REACT_PATH = os.path.abspath("../frontend/build")
app = Flask(
    __name__, static_folder=REACT_PATH, template_folder=REACT_PATH, static_url_path="/"
)


@app.route("/")
def index():
    return render_template("index.html")
