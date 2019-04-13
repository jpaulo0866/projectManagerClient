import { Role } from './../../../model/role.model';
import { RoleService } from './../../../services/register/role.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';
import { BaseComponent } from '../../base/impl/base.component';
import { EmployeeService } from 'src/app/services/register/employee.service';
import { DialogService } from 'src/app/dialog.service';
import { MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { PersonService } from 'src/app/services/register/person.service';
import { ResponseApi } from 'src/app/model/response.api';
import { Person } from 'src/app/model/person.model';
import { CrudBaseService } from 'src/app/services/interface/crud.interface.service';
import { formatDate } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
  providers:[]
})
export class EmployeeEditComponent extends BaseComponent<Employee> implements OnInit {
  dateFormat:any;
  public baseObject: Employee = new Employee();
  public listRole: Role[];
  hideFields = ['personId', 'disabled'];

  public getService(): CrudBaseService<Employee> {
    return this.employeeService;
  }

  constructor(
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private personService: PersonService,
    private adapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    adapter.setLocale('pt-BR');
    if (data.id) {
      this.findById(data.id);
    }
    if (data.readOnly) {
      this.readOnlyForm = data.readOnly;
    }
    this.loadCombo();
    
  }

  findById(id: string) {
    this.message = '';
    this.getService().findById(id).subscribe((response: ResponseApi) => {
      this.baseObject = response.data;   
      this.baseObject.hireDate = new Date(moment(this.baseObject.hireDate, `YYYY-MM-DD'T'HH:MMM:SS.SSS`).format('MM/DD/YYYY'));
      this.baseObject.fireDate = this.baseObject.fireDate ? 
        new Date(moment(this.baseObject.fireDate, `YYYY-MM-DD'T'HH:MMM:SS.SSS`).format('MM/DD/YYYY'))
        : null;
      if (!this.baseObject.person
        || !this.baseObject.person.cpf
        || !this.baseObject.person.firstName) {
        this.baseObject.person = new Person();
      }
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error.errors ? err.error.errors[0] : err.error.message
      });
    });
  }

  loadCombo() {
    this.roleService.findAll(0, 50).subscribe((response: ResponseApi) => {
      this.listRole = response.data.content;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error.errors ? err.error.errors[0] : err.error.message
      });
    });
  }

  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist.roleId === idSecond.roleId;
  }

  ngOnInit() {
  }
  save() {
    this.message = '';
    this.personService.createOrUpdate(this.baseObject.person).subscribe((response: ResponseApi) => {
      this.baseObject.person = response.data;
      this.employeeService.createOrUpdate(this.baseObject).subscribe((response: ResponseApi) => {
        this.baseObject = response.data;
        
      }, err => {
        this.showMessage({
          type: 'error',
          text: err.error.errors ? err.error.errors[0] : err.error.message
        });
      });
    });
  }
}
