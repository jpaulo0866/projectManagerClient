import { Component, OnInit, ViewChild } from '@angular/core';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { ProjectStage } from 'src/app/model/projectStage.model';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { ProjectStageEditComponent } from '../project-stage-edit/project-stage-edit.component';
import { ProjectStageService } from 'src/app/services/register/project-stage.service';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';
import { ResponseApi } from 'src/app/model/response.api';

@Component({
  selector: 'app-project-stage',
  templateUrl: './project-stage.component.html',
  styleUrls: ['./project-stage.component.scss']
})
export class ProjectStageComponent extends TablepaginatedComponent<ProjectStage> implements OnInit {
  projectStageModel: ModelGenericTable[] = new Array();
  searchModel: SearchFields[] = new Array();
  childView = ProjectStageEditComponent;
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<ProjectStage>;

  constructor(
    private projectStageService: ProjectStageService,
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
    model.fieldClassName = 'projectStageName';
    model.canonicClassName = 'Nome do Estágio';
    model.typeFieldName = 'string';
    this.projectStageModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'disabled';
    model.canonicClassName = 'Estágio do Projeto Desabilitado?';
    model.typeFieldName = 'boolean';
    this.projectStageModel.push(model);

    const search = new SearchFields();
    search.canonicName = 'Nome do Estágio do projeto';
    search.type = SearchType.Text;
    search.name = 'projectStageName';
    this.searchModel.push(search);
  }

  search(event) {
    if (event) {
      this.message = '';
      this.projectStageService.findByName(event.projectStageName).subscribe((response: ResponseApi) => {
        this.tablePagination.listObject = response.data.content;
        this.tablePagination.pages = [];
        this.tablePagination.first = true;
        this.tablePagination.last = true;
        this.tablePagination.totalElements = response.data.length;
        this.tablePagination.paginator.pageSize = response.data.length;
        this.tablePagination.paginator.disabled = true;
      }, err => {
        this.dialog.showSnackMessage('error' , err.error.errors ? err.error.errors[0] : err.error.message);
      });
    }
  }

}
