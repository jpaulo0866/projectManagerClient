import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { User } from 'src/app/model/user.model';
import { CrudBaseService } from '../interface/crud.interface.service';
import { Constants } from 'src/app/global/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudBaseServiceImpl<User> implements CrudBaseService<User> {
  public getPath(): string {
    return '/api/user';
  }

  public getIdField(): string {
    return 'userId';
  }

  public findByLogin(login: string) {
    return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/find/login/${login}`);
  }

  public findByProfile(profileId: string, page: number, count: number) {
    return this.genericGet(this.getPath(), 'find', 'profile', profileId, page, count);

    // return this.http.
    //   get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/find/profile/${profileId}/${page}/${count}`);
  }
}
