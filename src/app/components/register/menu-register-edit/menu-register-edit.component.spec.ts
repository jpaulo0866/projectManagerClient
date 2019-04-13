import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRegisterEditComponent } from './menu-register-edit.component';

describe('MenuRegisterEditComponent', () => {
  let component: MenuRegisterEditComponent;
  let fixture: ComponentFixture<MenuRegisterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRegisterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRegisterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
