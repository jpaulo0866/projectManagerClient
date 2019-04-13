import { Component, OnInit } from '@angular/core';
import { TypeContact } from 'src/app/model/types/typeContact.model';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { TypeContactEditComponent } from '../type-contact-edit/type-contact-edit.component';
import { TypeContactService } from 'src/app/services/types/type-contact.service';
import { MatDialog } from '@angular/material';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';

@Component({
  selector: 'app-type-contact',
  templateUrl: './type-contact.component.html',
  styleUrls: ['./type-contact.component.scss']
})
export class TypeContactComponent extends TablepaginatedComponent<TypeContact> implements OnInit {

  typeContact: TypeContact = new TypeContact();
  typeContactModel: ModelGenericTable[] = new Array();
  childView = TypeContactEditComponent;

  constructor(
    private typeContactService: TypeContactService,
    private sharedService: SharedService,
    private dialog: DialogService,
    private modal: MatDialog
  ) {
    super(sharedService);
    this.createModel();
  }

  ngOnInit() {
  }

  private createModel() {
    let model = new ModelGenericTable();
    model.fieldClassName = 'typeContactName';
    model.canonicClassName = 'Tipo de Contato';
    model.typeFieldName = 'string';
    this.typeContactModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'disabled';
    model.canonicClassName = 'Desabilitado?';
    model.typeFieldName = 'boolean';
    this.typeContactModel.push(model);

  }

}
