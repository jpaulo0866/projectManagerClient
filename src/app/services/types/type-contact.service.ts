import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { TypeContact } from 'src/app/model/types/typeContact.model';
import { CrudBaseService } from '../interface/crud.interface.service';

@Injectable({
  providedIn: 'root'
})
export class TypeContactService extends CrudBaseServiceImpl<TypeContact> implements CrudBaseService<TypeContact> {
  public getPath(): string {
    return '/api/typecontact';
  }
  public getIdField(): string {
    return 'typeContactId';
  }
}
