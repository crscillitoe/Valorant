import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Game } from '../services/api.service';
import { AgentNameToIconService } from '../services/agent-name-to-icon.service';
import { Router } from '@angular/router';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
  ) { }

  /**
   * These are the default meta tags that will be applied to a page
   * if no tags are specified.
   */
  defaultTags() {
    this.allTypeTags();
    this.allUrlTags();
    this.allTitleTags('Valorant Stat Tracking Site');

    this.allDescriptionTags('Valorant Stat Tracking Site')
    this.addOrUpdateTag({ name: 'keywords', content: this.getDefaultKeywords() });
    this.addOrUpdateTag({ name: 'robots', content: 'index, follow' });
  }

  /**
   * Generates game specific meta tags for URLs such as
   * `https://puzzlehub.io/games/Hashi`
   * @param gameID The ID of the game to generate meta tags for
   */
  gameTags(game: Game) {
    this.allTypeTags();
    this.allUrlTags();
    const gameOutcome = game[1];
    const agentName = game[3];
    this.allTitleTags(`Match ${game[0]}: ${agentName} ${gameOutcome}`);
    this.allImageTags(AgentNameToIconService.GetImagePath(agentName));

    this.allDescriptionTags(`Match ${game[0]}: ${game[3]} ${game[1]}`)
    this.addOrUpdateTag({ name: 'keywords', content: this.addDefaultKeywords(`${agentName}, ${agentName} ${gameOutcome}`) });
    this.addOrUpdateTag({ name: 'robots', content: 'index, follow' });
  }

  private addOrUpdateTag(tag: MetaDefinition) {
    this.metaService.updateTag(tag)
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
    this.addOrUpdateTag({ name: 'description', content: desc })
    this.addOrUpdateTag({ property: 'og:description', content: desc })
    this.addOrUpdateTag({ property: 'twitter:description', content: desc })
  }

  private allTypeTags() {
    this.addOrUpdateTag({ property: 'og:type', content: 'website' });
    this.addOrUpdateTag({ property: 'twitter:type', content: 'website' });
  }

  private allUrlTags(path?: string) {
    if (!path) { path = this.router.url; }

    // We must access environment variables through string literal syntax
    // tslint:disable-next-line: no-string-literal
    const externalUrl = `${env['EXTERNAL_URL']}${path}`;
    this.addOrUpdateTag({ name: 'url', content: externalUrl });
    this.addOrUpdateTag({ property: 'og:url', content: externalUrl });
    this.addOrUpdateTag({ property: 'twitter:url', content: externalUrl });
  }

  private allImageTags(imagePath: string) {
    // tslint:disable-next-line: no-string-literal
    const baseUrl = env['EXTERNAL_URL'];
    imagePath = `${baseUrl}/${imagePath}`;

    this.addOrUpdateTag({ property: 'og:image', content: imagePath });
    this.addOrUpdateTag({ property: 'og:image:width', content: '240' });
    this.addOrUpdateTag({ property: 'og:image:height', content: '240' });
    this.addOrUpdateTag({ property: 'og:image:type', content: 'image/png' });
    this.addOrUpdateTag({ property: 'twitter:image', content: imagePath });
  }
}