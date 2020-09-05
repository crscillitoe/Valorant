from __future__ import print_function

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import json
import pickle
import math
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# We will only be reading from our spreadsheet
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

# The ID of our spreadsheet
SPREADSHEET_ID = "10n2jJocYWrr9bMD5nAjqig0D8V-JKy4EOpGTmhGR6S8"

creds = None
# The file token.pickle stores the user's access and refresh tokens, and is
# created automatically when the authorization flow completes for the first
# time.
if os.path.exists("token.pickle"):
    with open("token.pickle", "rb") as token:
        creds = pickle.load(token)
# If there are no (valid) credentials available, let the user log in.
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file("secrets.json", SCOPES)
        creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open("token.pickle", "wb") as token:
        pickle.dump(creds, token)


@app.route("/api/v1/getGameById/<game_id>", methods=["GET"])
def get_game_by_id(game_id):
    service = build("sheets", "v4", credentials=creds)
    result = (
        service.spreadsheets()
        .values()
        .get(
            spreadsheetId=SPREADSHEET_ID,
            range=f"Games!A{int(game_id) + 1}:M{int(game_id) + 1}",
        )
        .execute()
    ).get("values", [])

    return {"game": result[0]}


@app.route("/api/v1/getGames", methods=["GET"])
def get_games():
    """
    USAGE:
        GET /api/v1/getStats?page=5
    """
    service = build("sheets", "v4", credentials=creds)
    page = request.args.get("page", default=0, type=int)
    num_games = get_num_games()

    # Page size is 10
    start_index = num_games - 9
    end_index = num_games + 1

    start_index -= page * 10
    end_index -= page * 10

    if start_index < 2:
        start_index = 2
        end_index = 12

    # Grab the 10 most recent games
    result = (
        service.spreadsheets()
        .values()
        .get(
            spreadsheetId=SPREADSHEET_ID,
            range=f"Games!A{start_index}:M{end_index}",
        )
        .execute()
    ).get("values", [])

    result.reverse()
    return {"page": page, "pages": math.ceil(num_games / 10), "games": result}


@app.route("/api/v1/getStats", methods=["GET"])
def get_stats():
    service = build("sheets", "v4", credentials=creds)
    sheet = service.spreadsheets()
    result = (
        sheet.values()
        .get(spreadsheetId=SPREADSHEET_ID, range="Statistics!B2:F10")
        .execute()
    )
    values = result.get("values", [])
    print(f"Values: {values}")
    return {
        "games_played": values[0][0],
        "wins": values[1][0],
        "losses": values[2][0],
        "win_rate": values[3][0],
        "kills_average": values[4][0],
        "deaths_average": values[5][0],
        "assists_average": values[6][0],
        "current_rank": values[8][0],
        "favorite_agent": values[0][4],
        "favorite_agent_games_played": values[1][4],
        "favorite_agent_wins": values[2][4],
        "favorite_agent_losses": values[3][4],
        "favorite_agent_win_rate": values[4][4],
    }


def get_num_games():
    service = build("sheets", "v4", credentials=creds)
    sheet = service.spreadsheets()
    result = (
        sheet.values()
        .get(spreadsheetId=SPREADSHEET_ID, range="Statistics!B2")
        .execute()
    )
    values = result.get("values", [])
    return int(values[0][0])
