import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeContactEditComponent } from './type-contact-edit.component';

describe('TypeContactEditComponent', () => {
  let component: TypeContactEditComponent;
  let fixture: ComponentFixture<TypeContactEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeContactEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
