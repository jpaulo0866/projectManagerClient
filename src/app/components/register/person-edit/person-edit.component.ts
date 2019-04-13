import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Person } from 'src/app/model/person.model';
import { BaseComponent } from '../../base/impl/base.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PersonService } from 'src/app/services/register/person.service';
import { Contact } from 'src/app/model/shared/contact.model';
import { Address } from 'src/app/model/shared/address.model';
import { DialogService } from 'src/app/dialog.service';
import { PersonRenderComponent } from '../shared/person-render/person-render.component';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent extends BaseComponent<Person> implements OnInit {

  public baseObject: Person = new Person();
  contact = new Contact();
  address = new Address();
  @ViewChild(PersonRenderComponent) personRenderComponent: PersonRenderComponent;

  public getService() {
    return this.personService;
  }

  isValidForm() {
    return this.baseObject.cpf && this.baseObject.firstName && this.baseObject.lastName && this.validationCpf();
  }

  validationCpf(): boolean{
    if (this.baseObject.cpf.length < 11) {
      return false;
    }
    return true;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private personService: PersonService,
    private dialogService: DialogService
  ) {
    super();
    if (data.id) {
      this.findById(data.id);
    }

    if (data.readOnly) {
      this.readOnlyForm = data.readOnly;
    }
  }

  ngOnInit() {
  }

}
