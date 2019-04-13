import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { ProjectStage } from 'src/app/model/projectStage.model';
import { ProjectStageService } from 'src/app/services/register/project-stage.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-project-stage-edit',
  templateUrl: './project-stage-edit.component.html',
  styleUrls: ['./project-stage-edit.component.scss']
})
export class ProjectStageEditComponent extends BaseComponent<ProjectStage> implements OnInit {

  public baseObject: ProjectStage = new ProjectStage();

  public getService() {
    return this.projectStageService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectStageService: ProjectStageService
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
