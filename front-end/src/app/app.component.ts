import { Component } from '@angular/core';
import { ApiService, GetGamesResponse, Game } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'front-end';
  games: GetGamesResponse;

  constructor(private api: ApiService) {
    api.getGames().subscribe((games) => {
      console.log(games);
      this.games = games;
    });
  }

  prettyPrint(game: Game) {
    return this.api.gameToString(game);
  }
}
