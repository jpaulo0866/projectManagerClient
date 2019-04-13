import { Component, OnInit, ViewChild } from '@angular/core';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { Customer } from 'src/app/model/customer.model';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';
import { CustomerService } from 'src/app/services/register/customer.service';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';
import { ResponseApi } from 'src/app/model/response.api';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends TablepaginatedComponent<Customer> implements OnInit {

  customerModel: ModelGenericTable[] = new Array();
  searchModel: SearchFields[] = new Array();
  childView = CustomerEditComponent;
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<Customer>;

  constructor(
    private customerService: CustomerService,
    private sharedService: SharedService,
    private dialog: DialogService,
    private modal: MatDialog

  ) {
    super(sharedService)
    this.createModel();
  }

  ngOnInit() {
  }

  private createModel() {
    let model = new ModelGenericTable();
    model.fieldClassName = 'customerName';
    model.canonicClassName = 'Cliente';
    model.typeFieldName = 'string';
    this.customerModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'customerCnpj';
    model.canonicClassName = 'CNPJ';
    model.typeFieldName = 'string';
    model.mask = '##.###.###/####-##'
    this.customerModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'customerUserManager';
    model.canonicClassName = 'Gerente da Conta';
    model.subFieldName = 'login'
    model.typeFieldName = 'object';
    this.customerModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'disabled';
    model.canonicClassName = 'Desabilitado';
    model.typeFieldName = 'boolean';
    this.customerModel.push(model);

    const search = new SearchFields();
    search.canonicName = 'Nome, CNPJ, Contrato, etc...';
    search.type = SearchType.Text;
    search.name = 'text';
    this.searchModel.push(search);

  }

  search(event) {
    if (event) {
      this.message = '';
      this.customerService.fullSearch(event.text).subscribe((response: ResponseApi) => {
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
