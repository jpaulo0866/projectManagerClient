import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugTypeComponent } from './bug-type.component';

describe('BugTypeComponent', () => {
  let component: BugTypeComponent;
  let fixture: ComponentFixture<BugTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
