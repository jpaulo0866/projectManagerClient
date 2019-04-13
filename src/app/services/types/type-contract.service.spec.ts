import { TestBed } from '@angular/core/testing';

import { TypeContractService } from './type-contract.service';

describe('TypeContractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeContractService = TestBed.get(TypeContractService);
    expect(service).toBeTruthy();
  });
});
