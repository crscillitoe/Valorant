import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../services/api.service';
import { RankToIconService } from '../services/rank-to-icon.service';
import { AgentNameToIconService } from '../services/agent-name-to-icon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() game: Game;

  constructor(private router: Router) {}
  ngOnInit(): void {}

  viewSingleGame(game: Game) {
    this.router.navigate(['/game', game[0]]);
  }

  getColor(game: Game) {
    if (game[1] === 'Loss') {
      return '#ef9a9a';
    } else {
      return '#a5d6a7';
    }
  }

  getRankIcon(icon: string) {
    return RankToIconService.GetImagePath(icon);
  }

  getAgentIcon(icon: string) {
    return AgentNameToIconService.GetImagePath(icon);
  }
}
