import { TestBed } from '@angular/core/testing';

import { AgentNameToIconService } from './agent-name-to-icon.service';

describe('AgentNameToIconService', () => {
  let service: AgentNameToIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentNameToIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
