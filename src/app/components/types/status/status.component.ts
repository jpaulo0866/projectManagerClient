import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/model/types/status.model';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { StatusEditComponent } from '../status-edit/status-edit.component';
import { StatusService } from 'src/app/services/types/status.service';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent extends TablepaginatedComponent<Status> implements OnInit {

  statusModel: ModelGenericTable[] = new Array();
  childView = StatusEditComponent;

  constructor(
    private statusService: StatusService,
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
    model.fieldClassName = 'statusName';
    model.canonicClassName = 'Tipo de Status';
    model.typeFieldName = 'string';
    this.statusModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'disabled';
    model.canonicClassName = 'Desabilitado?';
    model.typeFieldName = 'boolean';
    this.statusModel.push(model);

  }

}
