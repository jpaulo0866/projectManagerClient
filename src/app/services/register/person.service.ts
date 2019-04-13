import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { Person } from 'src/app/model/person.model';
import { CrudBaseService } from '../interface/crud.interface.service';
import { Constants } from 'src/app/global/constants';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends CrudBaseServiceImpl<Person> implements CrudBaseService<Person> {

  public getPath(): string {
    return '/api/person';
  }

  public getIdField(): string {
    return 'personId';
  }

  public fullSearch(text: string) {
    return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/find/full/${text}`);
  }
}
