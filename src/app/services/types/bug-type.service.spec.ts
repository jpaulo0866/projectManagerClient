import { TestBed } from '@angular/core/testing';

import { BugTypeService } from './bug-type.service';

describe('BugTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BugTypeService = TestBed.get(BugTypeService);
    expect(service).toBeTruthy();
  });
});
