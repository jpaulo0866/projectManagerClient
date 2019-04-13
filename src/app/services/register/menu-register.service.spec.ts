import { TestBed } from '@angular/core/testing';

import { MenuRegisterService } from './menu-register.service';

describe('MenuRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuRegisterService = TestBed.get(MenuRegisterService);
    expect(service).toBeTruthy();
  });
});
