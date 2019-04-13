import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { ProjectPriority } from 'src/app/model/ProjectPriority.model';
import { ProjectPriorityService } from 'src/app/services/register/project-priority.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-project-priority-edit',
  templateUrl: './project-priority-edit.component.html',
  styleUrls: ['./project-priority-edit.component.scss']
})
export class ProjectPriorityEditComponent extends BaseComponent<ProjectPriority>   implements OnInit {

  public baseObject: ProjectPriority = new ProjectPriority();

  public getService() {
    return this.projectPriorityService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectPriorityService: ProjectPriorityService
  ) {
    super();
    if (data.id) {
      this.findById(data.id);
    }

    if (data.readOnly) {
      this.readOnlyForm = data.readOnly;
    }
  }

  ngOnInit() {
  }

}
