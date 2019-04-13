import { Component, OnInit, ViewChild } from '@angular/core';
import { Team } from 'src/app/model/team.model';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { TeamEditComponent } from '../team-edit/team-edit.component';
import { TeamService } from 'src/app/services/register/team.service';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { ResponseApi } from 'src/app/model/response.api';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent extends TablepaginatedComponent<Team> implements OnInit {
  teamModel: ModelGenericTable[] = new Array();
  childView = TeamEditComponent;
  searchModel: SearchFields[] = new Array();
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<Team>;

  constructor(
    private teamService: TeamService,
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
    model.fieldClassName = 'teamName';
    model.canonicClassName = 'Nome da Equipe';
    model.typeFieldName = 'string';
    this.teamModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'users';
    model.canonicClassName = 'Número de Integrantes';
    model.typeFieldName = 'object';
    model.subFieldName = 'length';
    this.teamModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'disabled';
    model.canonicClassName = 'Equipe Desabilitada?';
    model.typeFieldName = 'boolean';
    this.teamModel.push(model);

    const search = new SearchFields();
    search.canonicName = 'Nome da Equipe';
    search.type = SearchType.Text;
    search.name = 'teamName';
    this.searchModel.push(search);

  }

  search(event) {
    if (event) {
      this.message = '';
      this.teamService.findByName(event.teamName, 0, 100).subscribe((response: ResponseApi) => {
        this.tablePagination.listObject = response.data.content;
        this.tablePagination.pages = new Array(response.data.totalPages);
        this.tablePagination.first = response.data.first;
        this.tablePagination.last = response.data.last;
        this.tablePagination.totalElements = response.data.totalElements;
        this.tablePagination.paginator.disabled = true;
      }, err => {
        this.dialogService.showSnackMessage('error' , err.error.errors ? err.error.errors[0] : err.error.message);
      });
    }
  }

}
