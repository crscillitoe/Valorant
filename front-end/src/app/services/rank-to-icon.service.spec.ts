import { TestBed } from '@angular/core/testing';

import { RankToIconService } from './rank-to-icon.service';

describe('RankToIconService', () => {
  let service: RankToIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankToIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
