import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { Team } from 'src/app/model/team.model';
import { CrudBaseService } from '../interface/crud.interface.service';
import { Constants } from 'src/app/global/constants';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends CrudBaseServiceImpl<Team> implements CrudBaseService<Team> {
  public getPath(): string {
    return '/api/team';
  }

  public getIdField(): string {
    return 'teamId';
  }

  findByName(teamName: string, page: number, count: number) {
    return this.http
    .get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/find/name/${teamName}/${page}/${count}`);
}

}
