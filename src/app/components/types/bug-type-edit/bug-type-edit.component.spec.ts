import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugTypeEditComponent } from './bug-type-edit.component';

describe('BugTypeEditComponent', () => {
  let component: BugTypeEditComponent;
  let fixture: ComponentFixture<BugTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
