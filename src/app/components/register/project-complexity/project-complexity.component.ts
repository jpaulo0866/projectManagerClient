import { ProjectComplexity } from '../../../model/projectComplexity.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { DialogService } from 'src/app/dialog.service';
import { SharedService } from 'src/app/services/shared.service';
import { ProjectComplexityService } from 'src/app/services/register/project-complexity.service';
import { MatDialog } from '@angular/material';
import { ProjectComplexityEditComponent } from '../project-complexity-edit/project-complexity-edit.component';

@Component({
  selector: 'app-project-complexity',
  templateUrl: './project-complexity.component.html',
  styleUrls: ['./project-complexity.component.scss']
})
export class ProjectComplexityComponent extends TablepaginatedComponent<ProjectComplexity> implements OnInit {
  projectComplexityModel: ModelGenericTable[] = new Array();
  childView = ProjectComplexityEditComponent;
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<ProjectComplexity>;

  constructor(
    private projectComplexityService: ProjectComplexityService,
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
    model.fieldClassName = 'projectComplexityName';
    model.canonicClassName = 'Nome da Complexidade';
    model.typeFieldName = 'string';
    this.projectComplexityModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'projectComplexityCost';
    model.canonicClassName = 'Custo Médio';
    model.typeFieldName = 'string';
    this.projectComplexityModel.push(model);
    
    model = new ModelGenericTable();
    model.fieldClassName = 'projectComplexityHours';
    model.canonicClassName = 'Volume de Horas';
    model.typeFieldName = 'string';
    this.projectComplexityModel.push(model);
  }

}
