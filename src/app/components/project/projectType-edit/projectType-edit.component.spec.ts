import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeEditComponent } from './projectType-edit.component';

describe('ProjectTypeEditComponent', () => {
  let component: ProjectTypeEditComponent;
  let fixture: ComponentFixture<ProjectTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
