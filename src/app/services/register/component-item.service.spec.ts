import { TestBed } from '@angular/core/testing';

import { ComponentItemService } from './component-item.service';

describe('ComponentItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentItemService = TestBed.get(ComponentItemService);
    expect(service).toBeTruthy();
  });
});
