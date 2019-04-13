import { TestBed } from '@angular/core/testing';

import { TypePermissionService } from './type-permission.service';

describe('TypePermissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypePermissionService = TestBed.get(TypePermissionService);
    expect(service).toBeTruthy();
  });
});
