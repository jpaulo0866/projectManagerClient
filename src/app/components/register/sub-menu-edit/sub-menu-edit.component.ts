import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { SubMenu } from 'src/app/model/subMenu.model';
import { AppRoute } from 'src/app/model/app-route.model';
import { SubMenuService } from 'src/app/services/register/sub-menu.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AppRouteService } from 'src/app/services/register/app-route.service';
import { DialogService } from 'src/app/dialog.service';
import { ResponseApi } from 'src/app/model/response.api';

@Component({
  selector: 'app-sub-menu-edit',
  templateUrl: './sub-menu-edit.component.html',
  styleUrls: ['./sub-menu-edit.component.scss']
})
export class SubMenuEditComponent extends BaseComponent<SubMenu> implements OnInit {

  public baseObject: SubMenu = new SubMenu();
  public selected: AppRoute;
  public listComponents: AppRoute[];

  hideFields = ['subMenuId', 'disabled'];

  public getService() {
    return this.subMenuService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subMenuService: SubMenuService,
    private appRouteService: AppRouteService,
    private dialogService: DialogService
  ) {
    super();
    this.baseObject.components = new Array();
    if (data.id) {
      this.findById(data.id);
    }

    if (data.readOnly) {
      this.readOnlyForm = data.readOnly;
    }

    this.loadCombo();
  }

  ngOnInit() {
  }

  addAppRoute() {
    if (this.baseObject.components.filter(item => item.componentId === this.selected.componentId).length === 0) {
      this.baseObject.components.push(this.selected);
    } else {
      this.dialogService.showSnackMessage('Component já inserido', '');
    }
  }

  remove(id: string) {
    const tempArray = this.baseObject.components.filter(item => item.componentId === id);
    if (tempArray.length === 1) {
      const index = this.baseObject.components.indexOf(tempArray[0]);
      if (index > -1) {
        this.baseObject.components.splice(index, 1);
      }
    }
  }

  loadCombo() {
    this.appRouteService.findAll(0, 100).subscribe((response: ResponseApi) => {
      this.listComponents = response.data.content;
    }, err => {
      this.dialogService.showSnackMessage(
        'error',
        err.error.errors ? err.error.errors[0] : err.error.message
      );
    });
  }

  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist.userId === idSecond.userId;
  }

}
