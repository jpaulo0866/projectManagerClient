import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { Status } from 'src/app/model/types/status.model';
import { CrudBaseService } from '../interface/crud.interface.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends CrudBaseServiceImpl<Status> implements CrudBaseService<Status> {
  public getPath(): string {
    return '/api/status';
  }
  public getIdField(): string {
    return 'statusId';
  }
}
