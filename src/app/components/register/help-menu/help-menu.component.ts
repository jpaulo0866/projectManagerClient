import { AppRoute } from './../../../model/app-route.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { DialogService } from 'src/app/dialog.service';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialog } from '@angular/material';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { ResponseApi } from 'src/app/model/response.api';
import { HelpMenu } from 'src/app/model/helpMenu.model'
import { HelpMenuEditComponent } from './../help-menu-edit/help-menu-edit.component';
import { HelpMenuService } from 'src/app/services/register/help-menu.service';
import { AppRouteService } from 'src/app/services/register/app-route.service';

@Component({
  selector: 'app-help-menu',
  templateUrl: './help-menu.component.html',
  styleUrls: ['./help-menu.component.scss']
})
export class HelpMenuComponent extends TablepaginatedComponent<HelpMenu> implements OnInit {
  helpMenuModel: ModelGenericTable[] = new Array();
  searchModel: SearchFields[] = new Array();
  childView = HelpMenuEditComponent;

  
  
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<HelpMenu>;



  constructor(
    private helpMenuService: HelpMenuService,
    private appRouteService: AppRouteService,
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
    model.fieldClassName = 'component';
    model.subFieldName = 'componentName';
    model.canonicClassName = 'Nome do Componente';
    model.typeFieldName = 'string';
    this.helpMenuModel.push(model);

    const search = new SearchFields();
    search.canonicName = 'componentName';
    search.type = SearchType.Text;
    search.name = 'text';
    this.searchModel.push(search);
  }

  // search(event) {
  //   if (event) {
  //     this.message = '';
  //     this.helpMenuService.findById(event.componentId).subscribe((response: ResponseApi) => {
  //       this.tablePagination.listObject = response.data;
  //       this.tablePagination.pages = [];
  //       this.tablePagination.first = true;
  //       this.tablePagination.last = true;
  //       this.tablePagination.totalElements = response.data.length;
  //       this.tablePagination.paginator.pageSize = response.data.length;
  //       this.tablePagination.paginator.disabled = true;
  //     }, err => {
  //       this.dialog.showSnackMessage('error' , err.error.errors ? err.error.errors[0] : err.error.message);
  //     });
  //   }
  // }
}
