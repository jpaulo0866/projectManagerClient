import { AppRouteService } from './../../../services/register/app-route.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { ComponentItem } from 'src/app/model/component-item.model';
import { BaseComponent } from '../../base/impl/base.component';
import { ComponentItemService } from 'src/app/services/register/component-item.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ResponseApi } from 'src/app/model/response.api';
import { AppRoute } from 'src/app/model/app-route.model';
import { DialogService } from 'src/app/dialog.service';

@Component({
  selector: 'app-component-item-edit',
  templateUrl: './component-item-edit.component.html',
  styleUrls: ['./component-item-edit.component.scss']
})
export class ComponentItemEditComponent extends BaseComponent<ComponentItem> implements OnInit {

  public listAppRoute: AppRoute[];
  public baseObject: ComponentItem = new ComponentItem();
  hideFields = ['componentItemId', 'disabled'];

  public getService() {
    return this.componentItemService;
  }

  constructor(
    private componentItemService: ComponentItemService,
    private appRouteService: AppRouteService,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    if (data.id) {
      this.findById(data.id);
    }
    if (data.readOnly) {
      this.readOnlyForm = data.readOnly;
    }
    this.loadCombo();
  }

  loadCombo() {
    this.appRouteService.findAll(0, 100).subscribe((response: ResponseApi) => {
      this.listAppRoute = response.data.content;
    }, err => {
      this.dialogService.showSnackMessage(
        'error',
        err.error.errors ? err.error.errors[0] : err.error.message
      );
    });
  }

  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist.profileId === idSecond.profileId;
  }

  ngOnInit() {
  }
}
