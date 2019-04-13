import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { Status } from 'src/app/model/types/status.model';
import { StatusService } from 'src/app/services/types/status.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.scss']
})
export class StatusEditComponent extends BaseComponent<Status> implements OnInit {

  public baseObject: Status = new Status();

  public getService() {
    return this.statusService;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private statusService: StatusService) {
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
