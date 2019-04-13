import { Component, OnInit, ViewChild } from '@angular/core';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { Role } from 'src/app/model/role.model';
import { RoleService } from 'src/app/services/register/role.service';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { RoleEditComponent } from '../role-edit/role-edit.component';
import { ResponseApi } from 'src/app/model/response.api';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent extends TablepaginatedComponent<Role> implements OnInit {

  roleModel: ModelGenericTable[] = new Array();
  searchModel: SearchFields[]= new Array();
  childView = RoleEditComponent;
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<Role>;

  constructor(
    private roleService: RoleService,
    private sharedService: SharedService,
    private dialog: DialogService,
    private modal: MatDialog
  ) {
    super(sharedService);
    this.createModel();
   }

  ngOnInit() {
  }

  private createModel(){
    let model = new ModelGenericTable();
    model.fieldClassName = 'roleName';
    model.canonicClassName = 'Nome do Cargo';
    model.typeFieldName= 'string';
    this.roleModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'disabled';
    model.canonicClassName = 'Cargo Desabilitado?';
    model.typeFieldName = 'boolean';
    this.roleModel.push(model);

    const search = new SearchFields();
    search.canonicName = 'Nome do Cargo';
    search.type = SearchType.Text;
    search.name = 'roleName';
    this.searchModel.push(search);
  }

  search(event){
    if (event) {
      this.message = '';
      this.roleService.findByName(event.roleName).subscribe((response: ResponseApi) => {
        this.tablePagination.listObject = response.data;
        this.tablePagination.pages = [];
        this.tablePagination.first = true;
        this.tablePagination.last = true;
        this.tablePagination.totalElements = response.data.length;
        this.tablePagination.paginator.pageSize = response.data.length;
        this.tablePagination.paginator.disabled = true;
      }, err=> {
        this.dialog.showSnackMessage('error' , err.error.errors ? err.error.errors[0] : err.error.message);
      })
    }
  }

}
