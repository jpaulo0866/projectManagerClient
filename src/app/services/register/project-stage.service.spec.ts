import { TestBed } from '@angular/core/testing';

import { ProjectStageService } from './project-stage.service';

describe('ProjectStageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectStageService = TestBed.get(ProjectStageService);
    expect(service).toBeTruthy();
  });
});
