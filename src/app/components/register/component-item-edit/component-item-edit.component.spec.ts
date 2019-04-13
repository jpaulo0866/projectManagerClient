import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentItemEditComponent } from './component-item-edit.component';

describe('ComponentItemEditComponent', () => {
  let component: ComponentItemEditComponent;
  let fixture: ComponentFixture<ComponentItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
