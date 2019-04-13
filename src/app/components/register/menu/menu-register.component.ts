import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuRegister } from 'src/app/model/menu-register.model';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { MenuRegisterEditComponent } from '../menu-register-edit/menu-register-edit.component';
import { MenuRegisterService } from 'src/app/services/register/menu-register.service';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { ResponseApi } from 'src/app/model/response.api';




@Component({
  selector: 'app-menu-register',
  templateUrl: './menu-register.component.html',
  styleUrls: ['./menu-register.component.scss']
})
export class MenuRegisterComponent extends TablepaginatedComponent<MenuRegister> implements OnInit {
  menuRegisterModel: ModelGenericTable[] = new Array();
  childView = MenuRegisterEditComponent;
  searchModel: SearchFields[] = new Array();
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<MenuRegister>;

  constructor(
    private menuRegisterService: MenuRegisterService,
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
    model.fieldClassName = 'menuName';
    model.canonicClassName = 'Nome do Menu';
    model.typeFieldName = 'string';
    this.menuRegisterModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'disabled';
    model.canonicClassName = 'Menu Desabilitado?';
    model.typeFieldName = 'boolean';
    this.menuRegisterModel.push(model);

    const search = new SearchFields();
    search.canonicName = 'Nome do Menu';
    search.type = SearchType.Text;
    search.name = 'menuRegisterName';
    this.searchModel.push(search);

  }


}
