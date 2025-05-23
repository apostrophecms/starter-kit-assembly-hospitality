import sys
import requests
import json
import os

dashboard = 'http://dashboard.localhost:3000'
dashboardApikey = os.getenv('AS_DASHBOARD_API_KEY')
siteApikey = os.getenv('AS_SITES_API_KEY')

if len(sys.argv) != 2:
    print("Usage: python poc.py <name>")
    sys.exit(1)

name = sys.argv[1]

base = f"{dashboard}/api/v1/"
headers = {
    'Content-Type': 'application/json',
    'Authorization': f'ApiKey {dashboardApikey}'
}

def post(path, data):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'ApiKey {dashboardApikey}'
    }
    response = requests.post(f"{base}{path}", headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to post data: {response.status_code}, {response.text}")

def upload_attachment_to_dashboard(file_path):
    # Not JSON this time
    headers = {
        'Authorization': f'ApiKey {dashboardApikey}'
    }
    with open(file_path, 'rb') as file:
        files = {'file': file}
        response = requests.post(f"{base}@apostrophecms/attachment/upload", headers=headers, files=files)
        if response.status_code == 200:
            print("Attachment uploaded successfully.")
            return response.json()
        else:
            raise Exception(f"Failed to upload attachment: {response.status_code}, {response.text}")

# Upload the logo as an attachment

dashboardSiteLogoAttachment = upload_attachment_to_dashboard('./assets/logo-blue.png')

# Create the logo image piece
dashboardSiteLogo = post("@apostrophecms/image", {
  "attachment": dashboardSiteLogoAttachment,
  "title": "Logo Blue"
})

print("Logo image piece created successfully.")

# Create the site

site = post("site", {
    "title": name,
    "adminPassword": name,
    "logo": {
        "metaType": "area",
        "items": [
            {
                "_image": [
                    dashboardSiteLogo
                ],
                "type": "@apostrophecms/image"
            }
        ]
    },
    "theme": "default",
    "template": False,
    "shortName": name,
    "prodHostname": "",
    "canonicalize": None,
    "canonicalizeStatus": "302",
    "locales": [
        {
            "name": "en",
            "label": "en",
            "private": False
        }
    ],
    "redirect": None,
    "redirectUrl": None,
    "redirectPreservePath": None,
    "redirectStatus": "302",
    "archived": False,
    "type": "site"
})

print("Site created successfully.")

print(f"Site URL is: {site['_siteUrl']}")
