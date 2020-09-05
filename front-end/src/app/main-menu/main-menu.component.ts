import { Component, OnInit } from '@angular/core';
import {
  GetGamesResponse,
  ApiService,
  Game,
  GetStatsResponse,
  GetWinratesResponse,
} from '../services/api.service';
import { RankToIconService } from '../services/rank-to-icon.service';
import { AgentNameToIconService } from '../services/agent-name-to-icon.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  games: GetGamesResponse;
  stats: GetStatsResponse;
  winRates: GetWinratesResponse;

  constructor(private api: ApiService) {
    api.getGames().subscribe((games) => {
      this.games = games;
    });

    api.getStats().subscribe((stats) => {
      this.stats = stats;
    });

    api.getWinrates().subscribe((winRates) => {
      this.winRates = winRates;
      this.winRates.win_rates = this.winRates.win_rates.filter((a) => {
        if (a.games_played === 'No Games Played') return false;
        return true;
      });

      this.winRates.win_rates.sort((a, b) => {
        if (+a.games_played < +b.games_played) return 1;
        if (+a.games_played > +b.games_played) return -1;
        return 0;
      });
    });
  }

  getColor(game: Game) {
    if (game[1] === 'Loss') {
      return '#ef9a9a';
    } else {
      return '#a5d6a7';
    }
  }

  prettyPrint(game: Game) {
    return this.api.gameToString(game);
  }

  getRankIcon(icon: string) {
    return RankToIconService.GetImagePath(icon);
  }

  getAgentIcon(icon: string) {
    return AgentNameToIconService.GetImagePath(icon);
  }
}
