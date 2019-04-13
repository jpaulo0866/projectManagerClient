import { TestBed } from '@angular/core/testing';

import { PageStatisticsService } from './page-statistics.service';

describe('PageStatisticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageStatisticsService = TestBed.get(PageStatisticsService);
    expect(service).toBeTruthy();
  });
});
