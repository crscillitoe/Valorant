import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  /**
   * Returns the game information for the specified game
   * @param ID The GameID
   */
  getGameByID(ID: number): Observable<GetGameByIDResponse> {
    return this.http.get<GetGameByIDResponse>(
      `${this.apiUrl}/api/v1/getGameById/${ID}`
    );
  }

  /**
   * Returns a page of games played, max length 10
   * @param page Page to get, default 0
   */
  getGames(page: number = 0): Observable<GetGamesResponse> {
    return this.http.get<GetGamesResponse>(
      `${this.apiUrl}/api/v1/getGames?page=${page}`
    );
  }

  /**
   * Get the aggregate stats
   */
  getStats(): Observable<GetStatsResponse> {
    return this.http.get<GetStatsResponse>(`${this.apiUrl}/api/v1/getStats`);
  }

  /**
   * Returns winrate information for each agent
   */
  getWinrates(): Observable<GetWinratesResponse> {
    return this.http.get<GetWinratesResponse>(
      `${this.apiUrl}/api/v1/getWinrates`
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

export interface GetWinratesResponse {
  win_rates: Array<Winrate>;
}

export interface Winrate {
  agent: string;
  games_played: string;
  win_rate: string;
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

export interface GetStatsResponse {
  /**
   * Total games played
   */
  games_played: number;
  /**
   * Total wins
   */
  wins: number;
  /**
   * Total losses
   */
  losses: number;
  /**
   * Aggregate Winrate
   */
  win_rate: string;
  /**
   * Average kills per game
   */
  kills_average: number;
  /**
   * Average deaths per game
   */
  deaths_average: number;
  /**
   * Average assists per game
   */
  assists_average: number;
  /**
   * Player's current rank
   */
  current_rank: string;
  /**
   * Player's favorite agent
   */
  favorite_agent: string;
  /**
   * # of games played on favorite agent
   */
  favorite_agent_games_played: string;
  /**
   * # of wins on favorite agent
   */
  favorite_agent_wins: number;
  /**
   * # of losses on favorite agent
   */
  favorite_agent_losses: number;
  /**
   * Aggregate winrate on favorite agent
   */
  favorite_agent_win_rate: string;
}

/**
 * `["GameID", "Win/Lose", "Agent", "Rank", "RankChange", "Kills", "Deaths", "Assists", "Comment", "Date", "Aces", "VOD"]`
 */
export type Game = Array<string>;
