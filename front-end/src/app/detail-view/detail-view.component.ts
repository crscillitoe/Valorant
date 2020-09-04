import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
})
export class DetailViewComponent implements OnInit {
  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      api.getGameByID(+params['id']).subscribe((game) => {
        console.log(game);
      });
    });
  }

  ngOnInit(): void {}
}
