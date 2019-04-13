import { TestBed } from '@angular/core/testing';
import { HelpMenuService } from './help-menu.service';

describe('HelpMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelpMenuService = TestBed.get(HelpMenuService);
    expect(service).toBeTruthy();
  });
});
