import { TestBed } from '@angular/core/testing';

import { TypeContactService } from './type-contact.service';

describe('TypeContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeContactService = TestBed.get(TypeContactService);
    expect(service).toBeTruthy();
  });
});
