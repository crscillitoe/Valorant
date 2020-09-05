import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Game, GetStatsResponse } from '../services/api.service';
import { AgentNameToIconService } from '../services/agent-name-to-icon.service';
import { Router } from '@angular/router';
import { env } from 'process';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {}

  /**
   * These are the default meta tags that will be applied to a page
   * if no tags are specified.
   */
  defaultTags(generalStats: GetStatsResponse) {
    this.allTypeTags();
    this.allUrlTags();
    this.allTitleTags(
      `Woohoojin - ${generalStats.current_rank} ${generalStats.favorite_agent} Main`
    );
    this.allImageTags(
      AgentNameToIconService.GetImagePath(generalStats.favorite_agent)
    );

    this.allDescriptionTags(
      `Win rate: ${generalStats.win_rate} Total wins: ${generalStats.wins}`
    );
    this.addOrUpdateTag({
      name: 'keywords',
      content: this.getDefaultKeywords(),
    });
    this.addOrUpdateTag({ name: 'robots', content: 'index, follow' });
  }

  /**
   * Generates game specific meta tags for URLs such as
   * `https://puzzlehub.io/games/Hashi`
   * @param gameID The ID of the game to generate meta tags for
   */
  gameTags(game: Game) {
    this.allTypeTags();
    this.allUrlTags(`/game/${game[0]}`);
    const gameOutcome = game[1];
    const agentName = game[2];
    this.allTitleTags(`Match ${game[0]}: ${agentName} ${gameOutcome}`);
    this.allImageTags(AgentNameToIconService.GetImagePath(agentName));

    this.allDescriptionTags(
      `${game[3]} | ${game[5]}/${game[6]}/${game[7]} | ${game[9]}`
    );
    this.addOrUpdateTag({
      name: 'keywords',
      content: this.addDefaultKeywords(
        `${agentName}, ${agentName} ${gameOutcome}`
      ),
    });
    this.addOrUpdateTag({ name: 'robots', content: 'index, follow' });
  }

  private addOrUpdateTag(tag: MetaDefinition) {
    this.metaService.updateTag(tag);
  }

  private getDefaultKeywords() {
    return 'valorant, valorant stats, valorant statistics, valorant tracking site';
  }

  private addDefaultKeywords(keywords: string) {
    return keywords + ', ' + this.getDefaultKeywords();
  }

  /**
   * Places the given title as the appropriate meta tags
   * for different popular services.
   * @param title The title tag to display
   */
  private allTitleTags(title: string) {
    this.titleService.setTitle(title);
    this.addOrUpdateTag({ property: 'og:title', content: title });
    this.addOrUpdateTag({ property: 'twitter:title', content: title });
  }

  /**
   * Places the given description as the appropriate meta tags
   * for different popular services.
   * @param desc The description to display
   */
  private allDescriptionTags(desc: string) {
    this.addOrUpdateTag({ name: 'description', content: desc });
    this.addOrUpdateTag({ property: 'og:description', content: desc });
    this.addOrUpdateTag({ property: 'twitter:description', content: desc });
  }

  private allTypeTags() {
    this.addOrUpdateTag({ property: 'og:type', content: 'website' });
    this.addOrUpdateTag({ property: 'twitter:type', content: 'website' });
  }

  private allUrlTags(path?: string) {
    if (!path) {
      path = this.router.url;
    }
    const externalUrl = `${environment.baseUrl}${path}`;
    this.addOrUpdateTag({ name: 'url', content: externalUrl });
    this.addOrUpdateTag({ property: 'og:url', content: externalUrl });
    this.addOrUpdateTag({ property: 'twitter:url', content: externalUrl });
  }

  private allImageTags(imagePath: string) {
    imagePath = `${environment.baseUrl}${imagePath}`;

    this.addOrUpdateTag({ property: 'og:image', content: imagePath });
    this.addOrUpdateTag({ property: 'og:image:width', content: '240' });
    this.addOrUpdateTag({ property: 'og:image:height', content: '240' });
    this.addOrUpdateTag({ property: 'og:image:type', content: 'image/png' });
    this.addOrUpdateTag({ property: 'twitter:image', content: imagePath });
  }
}
