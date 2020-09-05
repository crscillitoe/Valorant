import { Component, OnInit, Input } from '@angular/core';
import { GetStatsResponse } from '../services/api.service';
import { RankToIconService } from '../services/rank-to-icon.service';
import { AgentNameToIconService } from '../services/agent-name-to-icon.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  @Input() stats: GetStatsResponse;
  kda: string;

  constructor() {}

  ngOnInit(): void {
    this.kda = this.calculateKDA();
  }

  getRankIcon(icon: string) {
    return RankToIconService.GetImagePath(icon);
  }

  getAgentIcon(icon: string) {
    return AgentNameToIconService.GetImagePath(icon);
  }

  formatKDA(num: string): string {
    const asNumber = +num;
    return asNumber.toFixed(2);
  }

  calculateKDA(): string {
    const kills = +this.stats.kills_average;
    const deaths = +this.stats.deaths_average;
    const assists = +this.stats.assists_average;

    return ((kills + assists) / deaths).toFixed(2);
  }
}
