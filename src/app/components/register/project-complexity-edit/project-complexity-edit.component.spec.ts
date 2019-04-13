import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComplexityEditComponent } from './project-complexity-edit.component';

describe('ProjectComplexityEditComponent', () => {
  let component: ProjectComplexityEditComponent;
  let fixture: ComponentFixture<ProjectComplexityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComplexityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComplexityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
