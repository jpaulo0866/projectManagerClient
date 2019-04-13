import { EmployeeEditComponent } from './../employee-edit/employee-edit.component';
import { Employee } from './../../../model/employee.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { EmployeeService } from 'src/app/services/register/employee.service';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';
import { ResponseApi } from 'src/app/model/response.api';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent extends TablepaginatedComponent<Employee> implements OnInit {

  employeeModel: ModelGenericTable[] = new Array();
  childView = EmployeeEditComponent;
  searchModel: SearchFields[] = new Array();
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<Employee>;  

  constructor(
    private employeeService: EmployeeService,
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
    model.fieldClassName = 'person';
    model.canonicClassName = 'Nome';
    model.typeFieldName = 'object';
    model.subFieldName = 'firstName';
    this.employeeModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'person';
    model.canonicClassName = 'CPF';
    model.typeFieldName = 'object';
    model.subFieldName = 'cpf';
    model.mask = '###.###.###-##';
    this.employeeModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'createdDate';
    model.canonicClassName = 'Data de criação';
    model.typeFieldName = 'date';
    model.formatField = 'DD/MM/YYYY';
    this.employeeModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'role';
    model.canonicClassName = 'Cargo';
    model.typeFieldName = 'object';
    model.subFieldName = 'roleName';
    this.employeeModel.push(model);

    const search = new SearchFields();
    search.canonicName = 'Busca por nome, CPF, cargo, etc...';
    search.type = SearchType.Text;
    search.name = 'text';
    this.searchModel.push(search);
  }

  search(event) {
    if (event) {
      this.message = '';
      this.employeeService.fullSearch(event.text).subscribe((response: ResponseApi) => {
        this.tablePagination.listObject = response.data;
        this.tablePagination.pages = [];
        this.tablePagination.first = true;
        this.tablePagination.last = true;
        this.tablePagination.totalElements = response.data.length;
        this.tablePagination.paginator.pageSize = response.data.length;
        this.tablePagination.paginator.disabled = true;
      }, err => {
        this.dialog.showSnackMessage('error', err.error.errors ? err.error.errors[0] : err.error.message);
      });
    }
  }
}
