import { ProjectComplexity } from '../../model/projectComplexity.model';
import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { CrudBaseService } from '../interface/crud.interface.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectComplexityService extends CrudBaseServiceImpl<ProjectComplexity> implements CrudBaseService<ProjectComplexity>{
  public getPath(): string {
    return "/api/projectcomplexity";
  }
  public getIdField(): string {
    return "projectComplexityId";
  }
}
