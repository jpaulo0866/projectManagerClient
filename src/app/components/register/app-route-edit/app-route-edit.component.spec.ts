import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRouteEditComponent } from './app-route-edit.component';

describe('AppRouteEditComponent', () => {
  let component: AppRouteEditComponent;
  let fixture: ComponentFixture<AppRouteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRouteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRouteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
