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

  constructor() {}

  ngOnInit(): void {}

  getRankIcon(icon: string) {
    return RankToIconService.GetImagePath(icon);
  }

  getAgentIcon(icon: string) {
    return AgentNameToIconService.GetImagePath(icon);
  }
}
