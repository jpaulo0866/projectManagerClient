import { TestBed } from '@angular/core/testing';

import { ProjectPriorityService } from './project-priority.service';

describe('ProjectPriorityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectPriorityService = TestBed.get(ProjectPriorityService);
    expect(service).toBeTruthy();
  });
});
