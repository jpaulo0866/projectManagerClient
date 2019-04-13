import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { CrudBaseService } from '../interface/crud.interface.service';
import { Role } from 'src/app/model/role.model';
import { Constants } from 'src/app/global/constants';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends CrudBaseServiceImpl<Role> implements CrudBaseService<Role> {

  public getPath(): string{
    return '/api/role'
  }

  public getIdField(): string {
    return 'roleId';
  }
  
  public findByName(roleName: string){
    return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/find/name/${roleName}`);
  }
}
