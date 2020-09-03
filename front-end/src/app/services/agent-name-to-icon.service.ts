import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgentNameToIconService {
  /**
   * The folder that holds the agent icon images
   */
  static base_image_path: string = '/assets/images/agents/';

  /**
   * Returns the localized path to the agent's icon image file
   *
   * @param agentName The name of the agent
   */
  static GetImagePath(agentName: string) {
    return `${this.base_image_path}${agentName}.png`.toLowerCase();
  }
}
