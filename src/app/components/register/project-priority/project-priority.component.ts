import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { ProjectPriorityEditComponent } from '../project-priority-edit/project-priority-edit.component';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { ProjectPriority } from 'src/app/model/ProjectPriority.model';
import { ProjectPriorityService } from 'src/app/services/register/project-priority.service';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-project-priority',
  templateUrl: './project-priority.component.html',
  styleUrls: ['./project-priority.component.scss']
})
export class ProjectPriorityComponent extends TablepaginatedComponent<ProjectPriority> implements OnInit {

  projectPriorityModel: ModelGenericTable[] = new Array();
  searchModel: SearchFields[] = new Array();
  childView = ProjectPriorityEditComponent;
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<ProjectPriority>;

  constructor(
    private projectPriorityService: ProjectPriorityService,
    private sharedService: SharedService,
    private dialog: DialogService,
    private modal: MatDialog
  ) {
    super(sharedService);
    this.createModel();
  }

  ngOnInit() {
  }

  private createModel() {
    let model = new ModelGenericTable();
    model.fieldClassName = 'projectPriorityName';
    model.canonicClassName = 'Nome da prioridade de projeto';
    model.typeFieldName = 'string';
    this.projectPriorityModel.push(model);
  
  }

}
