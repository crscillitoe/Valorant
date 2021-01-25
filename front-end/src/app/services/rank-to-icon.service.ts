import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RankToIconService {
  /**
   * The folder that holds the rank icon images
   */
  static base_image_path: string = '/assets/images/ranks/';

  /**
   * Returns the localized path to the rank's icon image file
   *
   * @param rank The player's rank, e.g. "Bronze 1", "Platinum 3"
   */
  static GetImagePath(rank: string) {
    rank = rank.replace(' ', '_');
    return `${this.base_image_path}${rank}.png`.toLowerCase();
  }
}
