import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { ProjectStage } from 'src/app/model/projectStage.model';
import { CrudBaseService } from '../interface/crud.interface.service';
import { Constants } from 'src/app/global/constants';

@Injectable({
  providedIn: 'root'
})
export class ProjectStageService extends CrudBaseServiceImpl<ProjectStage> implements CrudBaseService<ProjectStage> {

  public getPath(): string {
    return '/api/projectstage';
  }

  public getIdField(): string {
    return 'projectStageId';
  }

  public findByName(projectStageName: string) {
    return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/find/name/${projectStageName}`);
  }
}
