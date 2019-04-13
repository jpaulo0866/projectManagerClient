import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { SubMenu } from 'src/app/model/subMenu.model';
import { CrudBaseService } from '../interface/crud.interface.service';
import { Constants } from 'src/app/global/constants';


@Injectable({
  providedIn: 'root'
})
export class SubMenuService extends CrudBaseServiceImpl<SubMenu> implements CrudBaseService<SubMenu> {

  public getPath(): string {
    return '/api/submenu';
  }  
  
  public getIdField(): string {
    return 'subMenuId';
  }

  public fullSearch(text: string) {
    return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/find/full/${text}`);
  } 
}
