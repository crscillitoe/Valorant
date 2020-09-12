import { Component, OnInit, Input } from '@angular/core';
import { GetStatsResponse } from '../services/api.service';
import { RankToIconService } from '../services/rank-to-icon.service';
import { AgentNameToIconService } from '../services/agent-name-to-icon.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  @Input() stats: GetStatsResponse;
  kda: string;
  username: string;

  constructor() { }

  ngOnInit(): void {
    this.kda = this.calculateKDA();
    this.username = environment.username;
  }

  getRankIcon(icon: string) {
    return RankToIconService.GetImagePath(icon);
  }

  getAgentIcon(icon: string) {
    return AgentNameToIconService.GetImagePath(icon);
  }

  formatKDA(num: any): string {
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
