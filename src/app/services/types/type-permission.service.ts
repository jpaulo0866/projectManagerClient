import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { TypePermission } from 'src/app/model/types/typePermission';
import { CrudBaseService } from '../interface/crud.interface.service';

@Injectable({
  providedIn: 'root'
})
export class TypePermissionService extends CrudBaseServiceImpl<TypePermission> implements CrudBaseService<TypePermission>{
  
  public getPath(): string {
    return '/api/typepermission';
  }
  
  public getIdField(): string {
    return 'typePermissionId';
  }

}
