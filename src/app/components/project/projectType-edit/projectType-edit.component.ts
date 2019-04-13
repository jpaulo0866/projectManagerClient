
import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { ProjectType } from 'src/app/model/projectType.model';
import { ProjectTypeService } from '../../../services/types/projectType.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-projectType-edit',
  templateUrl: './projectType-edit.component.html',
  styleUrls: ['./projectType-edit.component.scss']
})

export class ProjectTypeEditComponent extends BaseComponent<ProjectType> implements OnInit {

  public baseObject: ProjectType = new ProjectType();

  public getService() {
    return this.projectTypeService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectTypeService: ProjectTypeService
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
