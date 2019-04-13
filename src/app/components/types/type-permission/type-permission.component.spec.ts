import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePermissionComponent } from './type-permission.component';

describe('TypePermissionComponent', () => {
  let component: TypePermissionComponent;
  let fixture: ComponentFixture<TypePermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypePermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
