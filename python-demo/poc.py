import sys
import requests
import json
import os

protocol = 'http://'
domain = '.localhost:3000'

dashboardApikey = os.getenv('AS_DASHBOARD_API_KEY')
siteApikey = os.getenv('AS_SITES_API_KEY')

if len(sys.argv) != 2:
    print("Usage: python poc.py <name>")
    sys.exit(1)

name = sys.argv[1]

headers = {
    'Content-Type': 'application/json',
    'Authorization': f'ApiKey {dashboardApikey}'
}

def get_authorization(site):
    apikey = dashboardApikey if site == 'dashboard' else siteApikey
    return {
        'Authorization': f'ApiKey {apikey}'
    }

def post(site, path, data):
    base = f"{protocol}{site}{domain}/api/v1/"
    headers = get_authorization(site)
    headers['Content-Type'] = 'application/json'
    response = requests.post(f"{base}{path}", headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to post data: {response.status_code}, {response.text}")

def patch(site, path, data):
    base = f"{protocol}{site}{domain}/api/v1/"
    headers = get_authorization(site)
    headers['Content-Type'] = 'application/json'
    url = f"{base}{path}"
    print(f"Patching URL: {url}")
    print(f"Data: {json.dumps(data, indent=2)}")
    response = requests.patch(f"{base}{path}", headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to post data: {response.status_code}, {response.text}")

def get(site, path):
    base = f"{protocol}{site}{domain}/api/v1/"
    headers = get_authorization(site)
    response = requests.get(f"{base}{path}", headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to get data: {response.status_code}, {response.text}")

def upload_attachment(site, file_path):
    base = f"{protocol}{site}{domain}/api/v1/"
    # Not JSON this time
    headers = get_authorization(site)
    with open(file_path, 'rb') as file:
        files = {'file': file}
        url = f"{base}@apostrophecms/attachment/upload"
        print(f"Uploading attachment to {url}")
        response = requests.post(url, headers=headers, files=files)
        if response.status_code == 200:
            print("Attachment uploaded successfully.")
            return response.json()
        else:
            raise Exception(f"Failed to upload attachment: {response.status_code}, {response.text}")

# Upload the logo as an attachment

dashboardSiteLogoAttachment = upload_attachment('dashboard', './assets/logo-blue.png')

# Create the logo image piece
dashboardSiteLogo = post("dashboard", "@apostrophecms/image", {
  "attachment": dashboardSiteLogoAttachment,
  "title": "Logo Blue"
})

print("Logo image piece created successfully.")

# Create the site

site = post("dashboard", "site", {
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

# Create an image on the site

sitePhotoAttachment = upload_attachment(name, './assets/008-the-tiger-who-came-to-tea-pamela-raith-photography.full.jpg')

sitePhoto = post(name, "@apostrophecms/image", {
  "attachment": sitePhotoAttachment,
  "title": "Ensemble"
})

siteHomepage = get(name, "@apostrophecms/page")

siteHomepageId = siteHomepage['_id'] #.replace(':published', ':draft')

print(f"Homepage ID is: {siteHomepageId}")

result = patch(name, f"@apostrophecms/page/{siteHomepageId}", {
    "main": {
        "metaType": "area",
        "items": [
            {
                "_image": [
                    sitePhoto
                ],
                "type": "image"
            }
        ]
    }
})

print(result)

print(get(name, f"@apostrophecms/page/{siteHomepageId}"))

print("Image added to homepage successfully.")

