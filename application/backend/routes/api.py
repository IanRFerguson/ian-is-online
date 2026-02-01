import os
import xml.etree.ElementTree as ET
from datetime import datetime
from typing import Tuple

import requests
import resend
from flask import Blueprint, Response, jsonify, request
from utilities import application_logger

#####

api_bp = Blueprint("api", __name__, url_prefix="/api")

# Cache will be initialized by main.py
cache = None


def init_cache(cache_instance):
    """Initialize the cache instance for this blueprint."""
    global cache
    cache = cache_instance


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
    Results are cached for 30 minutes to avoid rate limiting.

    Returns:
        Tuple[Response, int]: A tuple containing the JSON response with articles
        and the HTTP status code.
    """

    # Try to get cached data first
    if cache:
        cached_data = cache.get("medium_articles")
        if cached_data:
            application_logger.info("Returning cached Medium articles")
            return jsonify(cached_data), 200

    application_logger.info("Fetching Medium RSS feed from source...")
    FETCH_LIMIT = 5

    try:
        # Fetch the RSS feed
        response = requests.get("https://medium.com/feed/@ianfergusonrva", timeout=10)
        response.raise_for_status()

        # Parse XML
        root = ET.fromstring(response.content)

        # Extract articles (limit to the latest FETCH_LIMIT)
        articles = []
        items = root.findall(".//item")[:FETCH_LIMIT]

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
            else:
                formatted_date = "Unknown date"

            articles.append(
                {
                    "title": title,
                    "link": link,
                    "date": formatted_date,
                }
            )

        result = {"articles": articles}

        # Cache the successful result for 30 minutes (1800 seconds)
        if cache:
            cache.set("medium_articles", result, timeout=1800)
            application_logger.info(
                f"Successfully fetched and cached {len(articles)} articles"
            )
        else:
            application_logger.info(
                f"Successfully fetched {len(articles)} articles (cache not available)"
            )

        return jsonify(result), 200

    except Exception as e:
        application_logger.error(f"Error fetching Medium articles: {e}")
        # If cache exists and request failed, try to return stale cache
        if cache:
            stale_data = cache.get("medium_articles")
            if stale_data:
                application_logger.warning(
                    "Returning stale cached data due to fetch error"
                )
                return jsonify(stale_data), 200
        return jsonify({"error": str(e), "articles": []}), 500
