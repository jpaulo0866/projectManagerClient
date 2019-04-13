import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { HelpMenu } from './../../../model/helpMenu.model';
import { HelpMenuService } from './../../../services/register/help-menu.service';
import { AppRoute } from './../../../model/app-route.model';
import { ResponseApi } from 'src/app/model/response.api';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AppRouteService } from 'src/app/services/register/app-route.service';
import { DialogService } from 'src/app/dialog.service';

@Component({
  selector: 'app-help-menu-edit',
  templateUrl: './help-menu-edit.component.html',
  styleUrls: ['./help-menu-edit.component.scss']
})

export class HelpMenuEditComponent extends BaseComponent<HelpMenu> implements OnInit {

  public baseObject: HelpMenu = new HelpMenu();
  public listComponents: AppRoute[];

  public getService() {
    return this.helpMenuService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private helpMenuService: HelpMenuService,
    private appRouteService: AppRouteService,
    private dialogService: DialogService
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

  ngOnInit() {
  }

  
  loadCombo() {
    this.appRouteService.findAll(0, 100).subscribe((response: ResponseApi) => {
      this.listComponents = response.data.content;
      console.log("loadCombo", this.listComponents)
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
