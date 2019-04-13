import { Component, OnInit } from '@angular/core';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { BugType } from 'src/app/model/types/bugType.model';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { BugTypeService } from 'src/app/services/types/bug-type.service';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';
import { TypeContactEditComponent } from '../type-contact-edit/type-contact-edit.component';
import { BugTypeEditComponent } from '../bug-type-edit/bug-type-edit.component';

@Component({
  selector: 'app-bug-type',
  templateUrl: './bug-type.component.html',
  styleUrls: ['./bug-type.component.scss']
})
export class BugTypeComponent extends TablepaginatedComponent<BugType> implements OnInit {

  bugType: BugType = new BugType();
  bugTypeModel: ModelGenericTable[]= new Array();
  childView = BugTypeEditComponent;
  constructor(
    private bugTypeService: BugTypeService,
    private sharedService: SharedService,
    private dialog: DialogService,
    private modal: MatDialog
  ) {
    super(sharedService)
    this.createModel();
   }


  ngOnInit() {
  }

  private createModel(){
    let model = new ModelGenericTable();
    model.fieldClassName = 'bugTypeName';
    model.canonicClassName = 'Tipo de Bug'
    model.typeFieldName = 'string';
    this.bugTypeModel.push(model);
  }

}
