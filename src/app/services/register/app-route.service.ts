import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { AppRoute } from 'src/app/model/app-route.model';
import { CrudBaseService } from '../interface/crud.interface.service';

@Injectable({
  providedIn: 'root'
})
export class AppRouteService extends CrudBaseServiceImpl <AppRoute> implements CrudBaseService<AppRoute>{

  
  public getPath(): string {
    return '/api/component';
  }
  public getIdField(): string {
   return 'componentId';
  }

  
}
