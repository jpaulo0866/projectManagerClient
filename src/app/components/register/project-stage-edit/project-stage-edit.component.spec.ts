import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStageEditComponent } from './project-stage-edit.component';

describe('ProjectStageEditComponent', () => {
  let component: ProjectStageEditComponent;
  let fixture: ComponentFixture<ProjectStageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
