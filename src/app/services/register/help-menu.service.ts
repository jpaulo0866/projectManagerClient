import { CrudBaseService } from '../interface/crud.interface.service';
import { HelpMenu } from './../../model/helpMenu.model';
import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';

@Injectable({
  providedIn: 'root'
})
export class HelpMenuService extends CrudBaseServiceImpl<HelpMenu> implements CrudBaseService<HelpMenu>{
  
  public getPath(): string {
    return '/api/help';
  }

  public getIdField(): string {
    return 'helpMenuId';
  }

}
