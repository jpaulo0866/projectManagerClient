import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { TypeContact } from 'src/app/model/types/typeContact.model';
import { TypeContactService } from 'src/app/services/types/type-contact.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-type-contact-edit',
  templateUrl: './type-contact-edit.component.html',
  styleUrls: ['./type-contact-edit.component.scss']
})
export class TypeContactEditComponent extends BaseComponent<TypeContact> implements OnInit {
  public baseObject: TypeContact = new TypeContact();

  public getService() {
    return this.typeContactService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private typeContactService: TypeContactService
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
