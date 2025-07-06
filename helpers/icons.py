import os
import requests
from pathlib import Path
from urllib.parse import urlparse

currencies = [
    {"type": "Scarab", "ninjaEndpoint": "itemoverview"},
    # You can add more types here
]

BASE_URL = "https://poe.ninja/api/data"
LEAGUE = "Mercenaries"
OUTPUT_DIR = Path("icons")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def sanitize_filename(name: str) -> str:
    return "".join(c if c.isalnum() or c in "_-" else "_" for c in name.replace(" ", "_"))

def download_image(url: str, filename: str):
    try:
        response = requests.get(url, stream=True, timeout=10)
        response.raise_for_status()
        file_path = OUTPUT_DIR / filename
        with open(file_path, "wb") as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)
        print(f"Downloaded: {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")

def fetch_and_download_icons():
    for currency in currencies:
        endpoint = f"{BASE_URL}/{currency['ninjaEndpoint']}?league={LEAGUE}&type={currency['type']}"
        try:
            response = requests.get(endpoint)
            response.raise_for_status()
            data = response.json()
            lines = data.get("lines", [])

            for item in lines:
                name = item.get("name") or item.get("currencyTypeName")
                icon_url = item.get("icon")
                if not name or not icon_url:
                    continue

                parsed = urlparse(icon_url)
                ext = os.path.splitext(parsed.path)[-1] or ".png"
                filename = sanitize_filename(name) + ext
                download_image(icon_url, filename)

        except Exception as e:
            print(f"Error fetching {currency['type']}: {e}")

if __name__ == "__main__":
    fetch_and_download_icons()
