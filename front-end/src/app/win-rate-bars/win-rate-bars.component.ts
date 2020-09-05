import { Component, OnInit, Input } from '@angular/core';
import { GetWinratesResponse } from '../services/api.service';

@Component({
  selector: 'app-win-rate-bars',
  templateUrl: './win-rate-bars.component.html',
  styleUrls: ['./win-rate-bars.component.scss'],
})
export class WinRateBarsComponent implements OnInit {
  @Input() winrates: GetWinratesResponse;

  constructor() {}

  ngOnInit(): void {}
}
