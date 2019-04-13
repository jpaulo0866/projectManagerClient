import { Component, OnInit, ViewChild } from '@angular/core';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { AppRoute } from 'src/app/model/app-route.model';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { SearchFields } from 'src/app/model/search.fields';
import { AppRouteEditComponent } from '../app-route-edit/app-route-edit.component';
import { AppRouteService } from 'src/app/services/register/app-route.service';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-app-route',
  templateUrl: './app-route.component.html',
  styleUrls: ['./app-route.component.scss']
})
export class AppRouteComponent extends TablepaginatedComponent<AppRoute> implements OnInit {
  appRouteModel: ModelGenericTable[] = new Array();

  searchModel: SearchFields[] = new Array();
  childView = AppRouteEditComponent;

  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<AppRoute>

  constructor(
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
    let modelName = new ModelGenericTable();
    modelName.fieldClassName = 'componentName';
    modelName.canonicClassName = 'Nome';
    modelName.typeFieldName = 'string';
    this.appRouteModel.push(modelName);

    let modelRouterLink = new ModelGenericTable();
    modelRouterLink.fieldClassName = 'routerLink';
    modelRouterLink.canonicClassName = 'Link';
    modelRouterLink.typeFieldName = 'string';
    this.appRouteModel.push(modelRouterLink);
  }

}
