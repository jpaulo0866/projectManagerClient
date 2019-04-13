import { Injectable } from '@angular/core';
import { CrudBaseService } from '../interface/crud.interface.service';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { Profile } from 'src/app/model/profile.model';
import { Constants } from 'src/app/global/constants';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends CrudBaseServiceImpl<Profile> implements CrudBaseService<Profile> {

  public getPath(): string {
    return '/api/profile';
  }

  public getIdField(): string {
    return 'profileId';
  }

  public findByName(profileName: string) {
    return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/find/name/${profileName}`);
  }
}
