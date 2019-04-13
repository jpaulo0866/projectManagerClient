import { Component, OnInit, Inject } from '@angular/core';
import { ProjectComplexity } from 'src/app/model/projectComplexity.model';
import { BaseComponent } from '../../base/impl/base.component';
import { ProjectComplexityService } from 'src/app/services/register/project-complexity.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-project-complexity-edit',
  templateUrl: './project-complexity-edit.component.html',
  styleUrls: ['./project-complexity-edit.component.scss']
})
export class ProjectComplexityEditComponent extends BaseComponent<ProjectComplexity> implements OnInit {

  public baseObject: ProjectComplexity = new ProjectComplexity;
  hideFields = ['complexityId', 'disabled'];

  public getService() {
    return this.projectComplexityService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectComplexityService: ProjectComplexityService
  ) { 
    super(); 
    if(data.id){
      this.findById(data.id);
    }
    if(data.readOnly){
      this.readOnlyForm = data.readOnly;
    }
  }

  ngOnInit() {
  }

}
