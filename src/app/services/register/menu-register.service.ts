import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { MenuRegister } from 'src/app/model/menu-register.model';
import { CrudBaseService } from '../interface/crud.interface.service';
import { Constants } from 'src/app/global/constants';


@Injectable({
  providedIn: 'root'
})
export class MenuRegisterService extends CrudBaseServiceImpl<MenuRegister> implements CrudBaseService<MenuRegister>   {

  public getPath(): string {
    return '/api/menu';
  }

  public getIdField(): string {
    return 'menuId';
  }

  
}



