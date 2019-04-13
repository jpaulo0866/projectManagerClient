import { Injectable } from '@angular/core';
import { ProjectPriority } from 'src/app/model/ProjectPriority.model';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { CrudBaseService } from '../interface/crud.interface.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectPriorityService extends CrudBaseServiceImpl<ProjectPriority> implements CrudBaseService<ProjectPriority>{
  
  public getPath(): string {
    return '/api/projectpriority';
  }
  public getIdField(): string {
    return 'projectPriorityId';
  }

}
