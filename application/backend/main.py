from constants import REACT_PATH
from flask import Flask, render_template
from flask_caching import Cache
from routes.api import api_bp
from utilities import application_logger

#####

app = Flask(
    __name__, static_folder=REACT_PATH, template_folder=REACT_PATH, static_url_path="/"
)
app.logger = application_logger

# Configure caching
cache = Cache(
    app,
    config={
        "CACHE_TYPE": "SimpleCache",  # In-memory cache
        "CACHE_DEFAULT_TIMEOUT": 600,  # 10 minutes default
    },
)

application_logger.debug(f"REACT_PATH=={REACT_PATH}")


@app.route("/")
def index():
    application_logger.info("Serving React app...")

    return render_template("index.html")


# Initialize cache for API blueprint
from routes.api import init_cache

init_cache(cache)

app.register_blueprint(api_bp)
