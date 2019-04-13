import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from 'src/app/model/person.model';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { PersonEditComponent } from '../person-edit/person-edit.component';
import { PersonService } from 'src/app/services/register/person.service';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';
import { ResponseApi } from 'src/app/model/response.api';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent extends TablepaginatedComponent<Person>  implements OnInit {
  personModel: ModelGenericTable[] = new Array();
  searchModel: SearchFields[] = new Array();
  childView = PersonEditComponent;
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<Person>;

  constructor(
    private personService: PersonService,
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
    model.fieldClassName = 'cpf';
    model.canonicClassName = 'CPF';
    model.typeFieldName = 'string';
    this.personModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'firstName';
    model.canonicClassName = 'Primeiro Nome';
    model.typeFieldName = 'string';
    this.personModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'lastName';
    model.canonicClassName = 'Sobrenome';
    model.typeFieldName = 'string';
    this.personModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'disabled';
    model.canonicClassName = 'Desabilitado?';
    model.typeFieldName = 'boolean';
    this.personModel.push(model);

    const search = new SearchFields();
    search.canonicName = 'Busca por nome, sobrenome, etc...';
    search.type = SearchType.Text;
    search.name = 'text';
    this.searchModel.push(search);
  }

  search(event) {
    if (event) {
      this.message = '';
      this.personService.fullSearch(event.text).subscribe((response: ResponseApi) => {
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
