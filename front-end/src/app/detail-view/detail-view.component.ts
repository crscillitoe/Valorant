import { Component, OnInit } from '@angular/core';
import { ApiService, Game } from '../services/api.service';
import { MetadataService } from '../services/metadata.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
})
export class DetailViewComponent implements OnInit {
  game: Game;

  constructor(private api: ApiService, private metadataService: MetadataService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      api.getGameByID(+params['id']).subscribe((game) => {
        console.log(game);
        this.game = game.game;
        this.metadataService.gameTags(game.game);
      });
    });
  }

  ngOnInit(): void { }
}
