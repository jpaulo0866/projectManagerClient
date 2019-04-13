import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { BugType } from 'src/app/model/types/bugType.model';
import { BugTypeService } from 'src/app/services/types/bug-type.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-bug-type-edit',
  templateUrl: './bug-type-edit.component.html',
  styleUrls: ['./bug-type-edit.component.scss']
})
export class BugTypeEditComponent extends BaseComponent<BugType> implements OnInit {

  public baseObject: BugType = new BugType();

  public getService(){
    return this.bugTypeService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bugTypeService: BugTypeService
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
