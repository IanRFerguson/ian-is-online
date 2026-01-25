import os

from main import app as application

#####

if __name__ == "__main__":
    host_ = os.environ.get("DEV__HOST", "0.0.0.0")
    port_ = os.environ.get("DEV__PORT", 5000)

    application.run(host=host_, port=port_)
