import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Contact } from 'src/app/model/shared/contact.model';
import { Address } from 'src/app/model/shared/address.model';
import { Person } from 'src/app/model/person.model';
import { DialogService } from 'src/app/dialog.service';

@Component({
  selector: 'app-person-render',
  templateUrl: './person-render.component.html',
  styleUrls: ['./person-render.component.scss']
})
export class PersonRenderComponent implements OnInit {

  @Input() person: Person;
  @Input() readOnlyForm: boolean;
  @Input() hideFields: string[];

  contact = new Contact();
  address = new Address();

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  addAddress(event: Address) {
    if (!this.person.addresses) {
      this.person.addresses = new Array();
    }
    this.person.addresses.push(event);
  }

  addContact(event: Contact) {
    if (!this.person.contacts) {
      this.person.contacts = new Array();
    }

    if (this.person.contacts.filter(item => item.value === event.value).length > 0) {
      this.dialogService.showSnackMessage('Contato já foi atribuído', '');
    } else {
      this.person.contacts.push(event);
    }
  }

  removeContact(value: string) {
    const tempArray = this.person.contacts.filter(item => item.value === value);
    if (tempArray.length === 1) {
      const index = this.person.contacts.indexOf(tempArray[0]);
      if (index > -1) {
        this.person.contacts.splice(index, 1);
      }
    }
  }

  removeAddress(address: Address) {
    const index = this.person.addresses.indexOf(address);
    if (index > -1) {
      this.person.addresses.splice(index, 1);
    }
  }

  hideField(name: string) {
    return this.hideFields && this.hideFields.includes(name);
  }

}
