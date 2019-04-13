import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPriorityEditComponent } from './project-priority-edit.component';

describe('ProjectPriorityEditComponent', () => {
  let component: ProjectPriorityEditComponent;
  let fixture: ComponentFixture<ProjectPriorityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPriorityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPriorityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
