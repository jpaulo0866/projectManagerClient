import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { BugType } from 'src/app/model/types/bugType.model';
import { CrudBaseService } from '../interface/crud.interface.service';

@Injectable({
  providedIn: 'root'
})
export class BugTypeService extends CrudBaseServiceImpl<BugType> implements CrudBaseService<BugType>{

  public getPath(): string{
    return '/api/bugtype';
  }

  public getIdField(): string{
    return 'bugTypeId';
  }

}
