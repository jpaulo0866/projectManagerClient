import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablepaginatedComponent } from './tablepaginated.component';

describe('TablepaginatedComponent', () => {
  let component: TablepaginatedComponent<any>;
  let fixture: ComponentFixture<TablepaginatedComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablepaginatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablepaginatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
