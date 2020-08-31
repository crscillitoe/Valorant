from __future__ import print_function

from flask import Flask, request
app = Flask(__name__)

import json
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

# The ID of our spreadsheet
SPREADSHEET_ID = '10n2jJocYWrr9bMD5nAjqig0D8V-JKy4EOpGTmhGR6S8'

creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
if os.path.exists('token.pickle'):
    with open('token.pickle', 'rb') as token:
        creds = pickle.load(token)
# If there are no (valid) credentials available, let the user log in.
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(
            'secrets.json', SCOPES)
        creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open('token.pickle', 'wb') as token:
        pickle.dump(creds, token)

service = build('sheets', 'v4', credentials=creds)

@app.route('/api/v1/getStats', methods=['GET'])
def get_stats():
    """
    USAGE:
        GET /api/v1/getStats?page=5
        Returns
            {
                "page": 5,
                "totalPages": 63,
                "games": [
                    {
                        "id": 32,
                        "win": false,
                        "rank": "Silver 2",
                        "rank_change": "Up",
                        "kills": 31,
                        "deaths": 20,
                        "assists": 5,
                        "date": "8/30/2020",
                        "vod": "https://youtu.be/pDAqHhPwKGw"
                    }
                ]
            }
    """
    page = request.args.get('page', default = 1, type = int)

    num_games = get_num_games()
    print(num_games)

    sheet = service.spreadsheets()

    # Grab the 10 most recent games
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=f"Games!A{num_games - 9}:M{num_games + 1}").execute()
    values = result.get('values', [])

    return {"data": values}

def get_num_games():
    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range="Statistics!B2").execute()
    values = result.get('values', [])
    return int(values[0][0])
