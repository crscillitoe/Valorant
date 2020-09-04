import { Component } from '@angular/core';
import { ApiService, GetGamesResponse, Game } from './services/api.service';
import { RankToIconService } from './services/rank-to-icon.service';
import { AgentNameToIconService } from './services/agent-name-to-icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'front-end';
}
