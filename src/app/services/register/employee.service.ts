import { CrudBaseService } from 'src/app/services/interface/crud.interface.service';
import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from '../impl/crud.impl.service';
import { Employee } from 'src/app/model/employee.model';
import { Constants } from 'src/app/global/constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CrudBaseServiceImpl<Employee> implements CrudBaseService<Employee>{
  public getPath(): string {
    return '/api/employee';
  }
  public getIdField(): string {
    return 'employeeId';
  }

  public fullSearch(text: string) {
    return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/find/full/${text}`);
  } 
}
