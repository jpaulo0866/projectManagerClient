import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { TypeContract } from 'src/app/model/types/typeOfContract.model';
import { CrudBaseService } from '../interface/crud.interface.service';
import { Constants } from 'src/app/global/constants';


@Injectable({
  providedIn: 'root'
})
export class TypeContractService extends CrudBaseServiceImpl<TypeContract> implements CrudBaseService<TypeContract> {
  public getPath(): string {
    return '/api/typeofcontract';
  }
  public getIdField(): string {
    return 'typeOfContractId';
  }
  findByName(typeContractName: string) {
    return this.http
      .get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/find/name/${typeContractName}`);
  }
}
