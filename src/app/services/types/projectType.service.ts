import { CrudBaseService } from '../interface/crud.interface.service';
import { Constants } from '../../global/constants';
import { ProjectType } from '../../model/projectType.model';
import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';



@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService extends CrudBaseServiceImpl<ProjectType> implements CrudBaseService<ProjectType>{
  
  public getPath(): string {
    return '/api/projecttype';
  }

  public getIdField(): string {
    return 'projectTypeId';
  }

  public findByName(projectTypeName: string) {
    return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/find/name/${projectTypeName}`);
  }
}
