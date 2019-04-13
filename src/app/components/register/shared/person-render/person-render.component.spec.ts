import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonRenderComponent } from './person-render.component';

describe('PersonRenderComponent', () => {
  let component: PersonRenderComponent;
  let fixture: ComponentFixture<PersonRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
