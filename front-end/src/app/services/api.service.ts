import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api_url: string = 'https://valorant-api.woohoojin.dev';
  constructor(private http: HttpClient) {}

  /**
   * Returns the game information for the specified game
   * @param ID The GameID
   */
  getGameByID(ID: number): Observable<GetGameByIDResponse> {
    return this.http.get<GetGameByIDResponse>(
      `${this.api_url}/api/v1/getGameById/${ID}`
    );
  }

  /**
   * Returns a page of games played, max length 10
   * @param page Page to get, default 0
   */
  getGames(page: number = 0): Observable<GetGamesResponse> {
    return this.http.get<GetGamesResponse>(
      `${this.api_url}/api/v1/getGames?page=${page}`
    );
  }

  /**
   * Returns a formatted version of the given game
   * @param game
   */
  gameToString(game: Game): string {
    return `
      GameID: ${game[0]}
      ${game[1]}
      ${game[2]}
      ${game[3]}
      Rank Change: ${game[4]}
      KDA: ${game[5]}/${game[6]}/${game[7]}
      Date: ${game[9]}
      VOD: ${game[11]}
    `;
  }
}

export interface GetGamesResponse {
  /**
   * Current page
   */
  page: number;
  /**
   * Total number of pages
   */
  pages: number;
  /**
   * List of games
   */
  games: Array<Game>;
}

export interface GetGameByIDResponse {
  /**
   * The game requested
   */
  game: Game;
}

/**
 * `["GameID", "Win/Lose", "Agent", "Rank", "RankChange", "Kills", "Deaths", "Assists", "Comment", "Date", "Aces", "VOD"]`
 */
export type Game = Array<string>;
