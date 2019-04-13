import { CrudBaseService } from 'src/app/services/interface/crud.interface.service';
import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { Contract } from 'src/app/model/contract.model';
import { Constants } from 'src/app/global/constants';

@Injectable({
  providedIn: 'root'
})
export class ContractService extends CrudBaseServiceImpl<Contract> implements CrudBaseService<Contract>{
  public getPath(): string {
    return '/api/contract';
  }  public getIdField(): string {
    return 'contractId';
  }
  public fullSearch(text: string) {
    return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/find/full/${text}`);
  } 
}
