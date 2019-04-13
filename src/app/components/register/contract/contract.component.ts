import { ContractService } from './../../../services/register/contract.service';
import { TablepaginatedComponent } from './../../base/tablepaginated/tablepaginated.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Contract } from 'src/app/model/contract.model';
import { DialogService } from 'src/app/dialog.service';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { ContractEditComponent } from '../contract-edit/contract-edit.component';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialog } from '@angular/material';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { ResponseApi } from 'src/app/model/response.api';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent extends TablepaginatedComponent<Contract> implements OnInit {

  contractModel: ModelGenericTable[] = new Array();
  searchModel: SearchFields[] = new Array();
  childView = ContractEditComponent;
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<Contract>;

  constructor(
    private contractService: ContractService,
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
    model.fieldClassName = 'contractName';
    model.canonicClassName = 'Nome do Contrato';
    model.typeFieldName = 'string';
    this.contractModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'typeOfContract';
    model.canonicClassName = 'Tipo do Contrato';
    model.subFieldName = 'typeOfContractName';
    model.typeFieldName = 'object';
    this.contractModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'contractHourPackage';
    model.canonicClassName = 'Pacote de horas';
    model.subFieldName = 'hourPackageName';
    model.typeFieldName = 'object';
    this.contractModel.push(model);

    const search = new SearchFields();
    search.canonicName = 'Nome, Tipo de Contrato e etc';
    search.type = SearchType.Text;
    search.name = 'text';
    this.searchModel.push(search);

  }

  search(event) {
    if (event) {
      this.message = '';
      this.contractService.fullSearch(event.text).subscribe((response: ResponseApi) => {
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
