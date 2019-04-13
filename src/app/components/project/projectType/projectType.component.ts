
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectType } from 'src/app/model/projectType.model';
import { ProjectTypeService } from '../../../services/types/projectType.service';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { DialogService } from 'src/app/dialog.service';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialog } from '@angular/material';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { ResponseApi } from 'src/app/model/response.api';
import { ProjectTypeEditComponent } from '../projectType-edit/projectType-edit.component';

@Component({
  selector: 'app-projectType',
  templateUrl: './projectType.component.html',
  styleUrls: ['./projectType.component.scss']
})
export class ProjectTypeComponent extends TablepaginatedComponent<ProjectType> implements OnInit {
  projectTypeModel: ModelGenericTable[] = new Array();
  searchModel: SearchFields[] = new Array();
  childView = ProjectTypeEditComponent;
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<ProjectType>;

  constructor(
    private projectTypeService: ProjectTypeService,
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
    model.fieldClassName = 'projectTypeName';
    model.canonicClassName = 'Tipo do Projeto';
    model.typeFieldName = 'string';
    this.projectTypeModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'disabled';
    model.canonicClassName = 'Tipo de Projeto Desabilitado?';
    model.typeFieldName = 'boolean';
    this.projectTypeModel.push(model);

    const search = new SearchFields();
    search.canonicName = 'Nome do Tipo de Projeto';
    search.type = SearchType.Text;
    search.name = 'projectTypeName';
    this.searchModel.push(search);
  }

  search(event) {
    if (event) {
      this.message = '';
      this.projectTypeService.findByName(event.projectTypeName).subscribe((response: ResponseApi) => {
        this.tablePagination.listObject = response.data;
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
