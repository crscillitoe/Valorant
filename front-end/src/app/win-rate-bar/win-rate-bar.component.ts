import { Component, OnInit, Input } from '@angular/core';
import { Winrate } from '../services/api.service';
import { AgentNameToIconService } from '../services/agent-name-to-icon.service';

@Component({
  selector: 'app-win-rate-bar',
  templateUrl: './win-rate-bar.component.html',
  styleUrls: ['./win-rate-bar.component.scss'],
})
export class WinRateBarComponent implements OnInit {
  @Input() winrate: Winrate;

  /**
   * Returns the % of games won
   */
  percentWins(): string {
    return this.winrate.win_rate;
  }

  percentLosses(): string {
    return 100 - +this.winrate.win_rate.split('%')[0] + '%';
  }

  getWinStyle() {
    if (this.winrate.win_rate === '100%') {
      return {
        'border-top-right-radius': '10px',
        'border-bottom-right-radius': '10px',
      };
    }

    return {};
  }

  getLossStyle() {
    if (this.winrate.win_rate === '0%') {
      return {
        'border-top-left-radius': '10px',
        'border-bottom-left-radius': '10px',
      };
    }

    return {};
  }

  getWins(): string {
    if (this.winrate.win_rate === '0%') {
      return null;
    }

    return (
      Math.round(
        (+this.percentWins().split('%')[0] * +this.winrate.games_played) / 100
      ) + 'W'
    );
  }

  getLosses(): string {
    if (this.winrate.win_rate === '100%') {
      return null;
    }

    return (
      Math.round(
        (+this.percentLosses().split('%')[0] * +this.winrate.games_played) / 100
      ) + 'L'
    );
  }

  constructor() {}

  ngOnInit(): void {}

  getAgentIcon(icon: string) {
    return AgentNameToIconService.GetImagePath(icon);
  }
}
