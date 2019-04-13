import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Contact } from 'src/app/model/shared/contact.model';
import { TypeContactService } from 'src/app/services/types/type-contact.service';
import { ResponseApi } from 'src/app/model/response.api';
import { TypeContact } from 'src/app/model/types/typeContact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() contact: Contact;
  @Input() readOnlyForm: boolean;
  @Output() addContact = new EventEmitter<Contact>();

  typeContacts: TypeContact[];
  teste: string = "(00) 00000-0000";

  constructor(private typeContactService: TypeContactService) { }

  ngOnInit() {
    this.typeContactService.findAll(0, 50).subscribe((item: ResponseApi) => {
      this.typeContacts = item.data.content;
    });
  }

  compareByOptionValue(idFist, idSecond) {
    return idFist && idSecond && idFist.value === idSecond.value;
  }

  clearContact() {
    this.contact = new Contact();
  }

  addEvent() {
    this.addContact.emit(this.contact);
    this.clearContact();
  }

  validForm(){
    
  }
}
