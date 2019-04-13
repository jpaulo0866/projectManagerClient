import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { Customer } from 'src/app/model/customer.model';
import { CrudBaseService } from '../interface/crud.interface.service';
import { Constants } from 'src/app/global/constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends CrudBaseServiceImpl<Customer> implements CrudBaseService<Customer> {

  public getPath(): string {
    return '/api/customer';
  }  

  public getIdField(): string {
    return 'customerId';
  }

  public fullSearch(text: string) {
    return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/find/full/${text}`);
  } 

}
