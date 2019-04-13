import { CrudBaseService } from 'src/app/services/interface/crud.interface.service';
import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { ComponentItem } from 'src/app/model/component-item.model';
import { Constants } from 'src/app/global/constants';

@Injectable({
  providedIn: 'root'
})
export class ComponentItemService extends CrudBaseServiceImpl<ComponentItem> implements CrudBaseService<ComponentItem>{
  public getPath(): string {
    return '/api/componentitem';
  }
  public getIdField(): string {
    return 'componentItemId';
  }
  public fullSearch(text: string) {
    return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/find/full/${text}`);
  } 
}
