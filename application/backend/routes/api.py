import os
from typing import Tuple
import xml.etree.ElementTree as ET
from datetime import datetime

import requests
import resend
from flask import Blueprint, Response, jsonify, request
from utilities import application_logger

#####

api_bp = Blueprint("api", __name__, url_prefix="/api")


@api_bp.route("/fetch_key", methods=["GET"])
def fetch_key() -> Tuple[Response, int]:
    """
    Fetches the RESEND_API_KEY from environment variables and returns it as JSON.
    If the key is not set, returns an error message.

    Returns:
        Tuple[Response, int]: A tuple containing the JSON response and the HTTP status code.
    """

    application_logger.debug("Fetching RESEND_API_KEY from environment variables...")
    api_key = os.environ.get("RESEND_API_KEY")

    if not api_key:
        application_logger.error("RESEND_API_KEY not set in environment variables.")
        return jsonify({"error": "RESEND_API_KEY not set"}), 500

    return jsonify({"api": api_key}), 200


@api_bp.route("/send", methods=["POST"])
def send_email() -> Tuple[Response, int]:
    """
    Sends an email using the Resend service with data from the request.

    Returns:
        Tuple[Response, int]: A tuple containing the JSON response and
        the HTTP status code.
    """

    application_logger.info("Received send_email request...")

    # Get JSON data from the request
    resp = request.get_json()

    # Extract necessary fields
    name = resp.get("name")
    email = resp.get("email")
    message = resp.get("message")

    params = {
        "from": "Contact Form <hello@ianferguson.dev>",  # Use your authenticated domain
        "to": [os.environ.get("CONTACT_EMAIL")],
        "subject": f"New Message from {name}",
        "html": f"<p><strong>From:</strong> {name} ({email})</p><p>{message}</p>",
    }

    try:
        r = resend.Emails.send(params=params)
        application_logger.info("Email sent successfully")
        return jsonify({"message": "Email sent successfully", "response": r}), 200

    except Exception as e:
        application_logger.error(f"Error sending email: {e}")
        return jsonify({"error": str(e)}), 500


@api_bp.route("/medium", methods=["GET"])
def get_medium_articles() -> Tuple[Response, int]:
    """
    Fetches the latest Medium articles from the RSS feed.

    Returns:
        Tuple[Response, int]: A tuple containing the JSON response with articles
        and the HTTP status code.
    """

    application_logger.info("Fetching Medium RSS feed...")

    try:
        # Fetch the RSS feed
        response = requests.get("https://medium.com/feed/@ianfergusonrva", timeout=10)
        response.raise_for_status()

        # Parse XML
        root = ET.fromstring(response.content)

        # Extract articles (limit to 3)
        articles = []
        items = root.findall(".//item")[:3]

        for item in items:
            title = (
                item.find("title").text
                if item.find("title") is not None
                else "No Title"
            )
            link = item.find("link").text if item.find("link") is not None else ""
            pub_date = (
                item.find("pubDate").text if item.find("pubDate") is not None else ""
            )

            # Parse and format the date
            if pub_date:
                try:
                    dt = datetime.strptime(pub_date, "%a, %d %b %Y %H:%M:%S %Z")
                    formatted_date = dt.strftime("%B %d, %Y")
                except Exception:
                    formatted_date = pub_date

            articles.append(
                {
                    "title": title,
                    "link": link,
                    "date": formatted_date if pub_date else "Unknown date",
                }
            )

        application_logger.info(f"Successfully fetched {len(articles)} articles")
        return jsonify({"articles": articles}), 200

    except Exception as e:
        application_logger.error(f"Error fetching Medium articles: {e}")
        return jsonify({"error": str(e), "articles": []}), 500
