import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeContract } from 'src/app/model/types/typeOfContract.model';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { TypeContractEditComponent } from '../type-contract-edit/type-contract-edit.component';
import { TypeContractService } from 'src/app/services/types/type-contract.service';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { ResponseApi } from 'src/app/model/response.api';


@Component({
  selector: 'app-type-contract',
  templateUrl: './type-contract.component.html',
  styleUrls: ['./type-contract.component.scss']
})
export class TypeContractComponent extends TablepaginatedComponent<TypeContract> implements OnInit {

  // typeContract: TypeContract = new TypeContract();
  typeContractModel: ModelGenericTable[] = new Array();
  childView = TypeContractEditComponent;
  searchModel: SearchFields[] = new Array();
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<TypeContract>;

  constructor(
    private typeContractService: TypeContractService,
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
    model.fieldClassName = 'typeOfContractName';
    model.canonicClassName = 'Tipo de Contrato';
    model.typeFieldName = 'string';
    this.typeContractModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'disabled';
    model.canonicClassName = 'Desabilitado?';
    model.typeFieldName = 'boolean';
    this.typeContractModel.push(model);

    const search = new SearchFields();
    search.canonicName = 'Nome Tipo de Contrato';
    search.type = SearchType.Text;
    search.name = 'typeContractName';
    this.searchModel.push(search);

  } 

  search(event) {
    if (event) {
      this.message = '';
      this.typeContractService.findByName(event.typeContractName).subscribe((response: ResponseApi) => {
        this.tablePagination.listObject = response.data;
        this.tablePagination.pages = [];
        this.tablePagination.first = true;
        this.tablePagination.last = true;
        this.tablePagination.totalElements = response.data.length;
        this.tablePagination.paginator.disabled = true;
      }, err => {
        this.dialogService.showSnackMessage('error' , err.error.errors ? err.error.errors[0] : err.error.message);
      });
    }
  }

}


// user = new User();
// userModel: ModelGenericTable[] = new Array();
// searchModel: SearchFields[] = new Array();
// searchProfileModel: SearchFields[] = new Array();
// childView = UserEditComponent;
// private profiles: Profile[];
// @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<User>;
// private searchFilter: any;

// constructor(
//   private userService: UserService,
//   private profileService: ProfileService,
//   private sharedService: SharedService,
//   private dialog: DialogService,
//   private modal: MatDialog
// ) {
//   super(sharedService);
//   this.createModel();
//   this.profileService.findAll(0, 100).subscribe((response: ResponseApi) => {
//     this.profiles = response.data.content;
//     const search = new SearchFields();
//     search.canonicName = 'Perfil';
//     search.name = 'profile';
//     search.type = SearchType.Select;
//     search.dataSource = this.profiles;
//     search.dataSourceField = 'profileName';
//     this.searchProfileModel.push(search);

//   });
// }

// ngOnInit() {
// }

// private createModel() {
//   let model = new ModelGenericTable();
//   model.fieldClassName = 'ldapUser';
//   model.canonicClassName = 'Usuário do AD';
//   model.typeFieldName = 'boolean';
//   this.userModel.push(model);

//   model = new ModelGenericTable();
//   model.fieldClassName = 'login';
//   model.canonicClassName = 'Login';
//   model.typeFieldName = 'string';
//   this.userModel.push(model);

//   model = new ModelGenericTable();
//   model.fieldClassName = 'profile';
//   model.canonicClassName = 'Perfil';
//   model.subFieldName = 'profileName';
//   model.typeFieldName = 'object';
//   this.userModel.push(model);

//   model = new ModelGenericTable();
//   model.fieldClassName = 'createdDate';
//   model.canonicClassName = 'Data de criação';
//   model.typeFieldName = 'Date';
//   model.formatField = 'DD/MM/YYYY';
//   this.userModel.push(model);

//   model = new ModelGenericTable();
//   model.fieldClassName = 'disabled';
//   model.canonicClassName = 'Usuário desabilitado?';
//   model.typeFieldName = 'boolean';
//   this.userModel.push(model);

//   const search = new SearchFields();
//   search.canonicName = 'Login';
//   search.name = 'login';
//   search.type = SearchType.Text;
//   this.searchModel.push(search);
// }

// search(event) {
//   if (event) {
//     this.message = '';
//     this.userService.findByLogin(event.login).subscribe((response: ResponseApi) => {
//       const newArray = new Array();
//       newArray.push(response.data);
//       this.tablePagination.listObject = newArray;
//       this.tablePagination.pages = [];
//       this.tablePagination.first = true;
//       this.tablePagination.last = true;
//       this.tablePagination.totalElements = 1;
//       this.tablePagination.paginator.disabled = true;
//     }, err => {
//       this.dialog.showSnackMessage('Erro na pesquisa por Login', err.error.errors ? err.error.errors[0] : err.error.message);
//     });
//   }
// }

// private paginateSearch() {
//   //this.tablePagination.paginator.page.unsubscribe();
//   this.tablePagination.findAllSubscription.unsubscribe();
//   this.tablePagination.paginator.page.subscribe((event: PageEvent) => {
//     this.isLoadingResults = true;
//     (this.tablePagination.getService() as UserService).findByProfile(this.searchFilter.profile.profileId, event.pageIndex, event.pageSize)
//     .subscribe((response: ResponseApi) => {
//       this.tablePagination.listObject = response.data.content;
//       this.tablePagination.pages = new Array(response.data.totalPages);
//       this.tablePagination.first = response.data.first;
//       this.tablePagination.last = response.data.last;
//       this.tablePagination.totalElements = response.data.totalElements;
//       //this.tablePagination.paginator.disabled = true;
//     }, err => {
//       this.dialogService.showSnackMessage('error', err.error.errors ? err.error.errors[0] : err.error.message);
//     });
//     this.isLoadingResults = false;
//   });
// }

// searchProfile(event) {
//   if (event) {
//     this.searchFilter = event;
//     this.message = '';
//     this.userService.findByProfile(event.profile.profileId, 0, this.tablePagination.paginator.pageSize)
//       .subscribe((response: ResponseApi) => {
//         this.tablePagination.listObject = response.data.content;
//         this.tablePagination.pages = new Array(response.data.totalPages);
//         this.tablePagination.first = response.data.first;
//         this.tablePagination.last = response.data.last;
//         this.tablePagination.totalElements = response.data.totalElements;
//       }, err => {
//         this.dialogService.showSnackMessage('error', err.error.errors ? err.error.errors[0] : err.error.message);
//       });
//     this.paginateSearch();
//   }
// // }
// }
