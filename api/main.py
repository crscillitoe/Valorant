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

with open("config.json", "r") as config_file:
    config = json.load(config_file)

# The ID of our spreadsheet
SPREADSHEET_ID = config["spreadsheed_id"]

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
    num_games = get_num_games()
    service = build("sheets", "v4", credentials=creds)
    result = (
        service.spreadsheets()
        .values()
        .get(
            spreadsheetId=SPREADSHEET_ID,
            range=f"Games!A{num_games - int(game_id) + 2}:M{num_games - int(game_id) + 2}",
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
    page_size = 8

    start_index = 2
    end_index = start_index + page_size - 1

    start_index += page * page_size
    end_index += page * page_size

    if start_index > num_games:
        start_index = num_games - page_size - 2
        end_index = num_games + 1

    # Grab the page_size most recent games
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=SPREADSHEET_ID, range=f"Games!A{start_index}:M{end_index}",)
        .execute()
    ).get("values", [])

    return {"page": page, "pages": math.ceil(num_games / page_size), "games": result}


@app.route("/api/v1/getWinrates", methods=["GET"])
def get_winrates():
    service = build("sheets", "v4", credentials=creds)
    sheet = service.spreadsheets()
    result = (
        sheet.values()
        .get(spreadsheetId=SPREADSHEET_ID, range="Champ Win Rates!B1:M3")
        .execute()
    )
    values = result.get("values", [])
    to_return = []
    for i in range(len(values[0])):
        to_return.append(
            {
                "agent": values[0][i],
                "win_rate": values[1][i],
                "games_played": values[2][i],
            }
        )
    return {"win_rates": to_return}


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
