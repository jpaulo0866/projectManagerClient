import { TestBed } from '@angular/core/testing';

import { ProjectComplexityService } from './project-complexity.service';

describe('ProjectComplexityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectComplexityService = TestBed.get(ProjectComplexityService);
    expect(service).toBeTruthy();
  });
});
