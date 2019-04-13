import { Component, OnInit, ViewChild } from '@angular/core';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { SubMenu } from 'src/app/model/subMenu.model';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { SubMenuEditComponent } from '../sub-menu-edit/sub-menu-edit.component';
import { SubMenuService } from 'src/app/services/register/sub-menu.service';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent extends TablepaginatedComponent<SubMenu> implements OnInit {

  subMenuModel: ModelGenericTable[] = new Array();
  searchModel: SearchFields[] = new Array();
  childView = SubMenuEditComponent;
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<SubMenu>;

  constructor(
    private subMenuService: SubMenuService,
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
    model.fieldClassName = 'subMenuName';
    model.canonicClassName = 'Nome do SubMenu';
    model.typeFieldName = 'string';
    this.subMenuModel.push(model);

    const search = new SearchFields();
    search.canonicName = 'Nome, Tipo de SubMenu e etc';
    search.type = SearchType.Text;
    search.name = 'text';
    this.searchModel.push(search);
  }

  // search(event) {
  //   if (event) {
  //     this.message = '';
  //     this.subMenuService.fullSearch(event.text).subscribe((response: ResponseApi) => {
  //       this.tablePagination.listObject = response.data;
  //       this.tablePagination.pages = [];
  //       this.tablePagination.first = true;
  //       this.tablePagination.last = true;
  //       this.tablePagination.totalElements = response.data.length;
  //       this.tablePagination.paginator.pageSize = response.data.length;
  //       this.tablePagination.paginator.disabled = true;
  //     }, err => {
  //       this.dialog.showSnackMessage('error', err.error.errors ? err.error.errors[0] : err.error.message);
  //     });
  //   }
  // }

}
