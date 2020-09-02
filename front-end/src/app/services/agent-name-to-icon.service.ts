import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgentNameToIconService {
  base_image_path: string = '/assets/images/agents/';

  constructor() {}
}
