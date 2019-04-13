import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePermissionEditComponent } from './type-permission-edit.component';

describe('TypePermissionEditComponent', () => {
  let component: TypePermissionEditComponent;
  let fixture: ComponentFixture<TypePermissionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypePermissionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePermissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
