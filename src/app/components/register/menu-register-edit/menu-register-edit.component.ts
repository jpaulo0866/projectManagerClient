import { Component, OnInit, Inject } from '@angular/core';
import { MenuRegister } from 'src/app/model/menu-register.model';
import { BaseComponent } from '../../base/impl/base.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MenuRegisterService } from 'src/app/services/register/menu-register.service';
import { SubMenu } from 'src/app/model/subMenu.model';
import { SubMenuService } from 'src/app/services/register/sub-menu.service';
import { DialogService } from 'src/app/dialog.service';
import { ResponseApi } from 'src/app/model/response.api';


@Component({
  selector: 'app-menu-register-edit',
  templateUrl: './menu-register-edit.component.html',
  styleUrls: ['./menu-register-edit.component.scss']
})
export class MenuRegisterEditComponent extends BaseComponent<MenuRegister>  implements OnInit {

  public baseObject: MenuRegister = new MenuRegister();
  public selected: SubMenu;
  public listSubMenu: SubMenu[];

  public getService() {
    return this.menuRegisterService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private menuRegisterService: MenuRegisterService,
    private subMenuService: SubMenuService,
    private dialogService: DialogService
  ) {
    
    super();
   
    if (data.id) {
      this.findById(data.id);
    }

    if (data.readOnly) {
      this.readOnlyForm = data.readOnly;
    }

   }

  ngOnInit() {
    this.loadCombo();
  }

  addSubMenu() {
    if(this.baseObject.subMenu.filter(item => item.subMenuId === this.selected.subMenuId).length === 0) {
      this.baseObject.subMenu.push(this.selected);
    }else{
      this.dialogService.showSnackMessage('Submenu dulplicado','');
    }
    }
  

  remove(id: string) {
    const tempArray = this.baseObject.subMenu.filter(item => item.subMenuId === id);
    if (tempArray.length === 1) {
      const index = this.baseObject.subMenu.indexOf(tempArray[0]);
      if (index > -1) {
        this.baseObject.subMenu.splice(index, 1);
      }
    }
  }

  loadCombo() {
    this.subMenuService.findAll(0, 100).subscribe((response: ResponseApi) => {
      this.listSubMenu = response.data.content;
    }, err => {
      this.dialogService.showSnackMessage(
        'error',
        err.error.errors ? err.error.errors[0] : err.error.message
      );
    });
  }

  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist.subMenuId === idSecond.subMenuId;
  }


}

  


