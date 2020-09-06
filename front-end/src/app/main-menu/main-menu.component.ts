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
import { MetadataService } from '../services/metadata.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  games: GetGamesResponse;
  stats: GetStatsResponse;
  winRates: GetWinratesResponse;

  selectedPage: number = 1;
  loadingGames: boolean = false;

  constructor(
    private api: ApiService,
    private metadataService: MetadataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.queryParams.subscribe((params) => {
      let page = 1;
      if (params['page']) {
        page = +params['page'];
        this.selectedPage = page;
      }

      api.getGames(page - 1).subscribe((games) => {
        this.games = games;
      });
    });

    api.getStats().subscribe((stats) => {
      this.stats = stats;
      this.metadataService.defaultTags(stats);
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

  updatePage(page: number) {
    window.scrollTo(0, 0);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }

  specificPage(page: number) {
    this.loadingGames = true;
    this.api.getGames(page).subscribe((games) => {
      this.selectedPage = games.page + 1;
      this.updatePage(this.selectedPage);
      this.games = games;
      this.loadingGames = false;
    });
  }

  firstPage() {
    this.loadingGames = true;
    this.api.getGames().subscribe((games) => {
      this.selectedPage = games.page + 1;
      this.updatePage(this.selectedPage);
      this.games = games;
      this.loadingGames = false;
    });
  }

  lastPage() {
    this.loadingGames = true;
    this.api.getGames(this.games.pages).subscribe((games) => {
      this.selectedPage = games.page + 1;
      this.updatePage(this.selectedPage);
      this.games = games;
      this.loadingGames = false;
    });
  }

  previousPage() {
    this.loadingGames = true;
    this.api.getGames(this.games.page - 1).subscribe((games) => {
      this.selectedPage = games.page + 1;
      this.updatePage(this.selectedPage);
      this.games = games;
      this.loadingGames = false;
    });
  }

  nextPage() {
    this.loadingGames = true;
    this.api.getGames(this.games.page + 1).subscribe((games) => {
      this.selectedPage = games.page + 1;
      this.updatePage(this.selectedPage);
      this.games = games;
      this.loadingGames = false;
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
