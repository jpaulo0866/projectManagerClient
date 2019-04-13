import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { TypePermission } from 'src/app/model/types/typePermission';
import { TypePermissionService } from 'src/app/services/types/type-permission.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-type-permission-edit',
  templateUrl: './type-permission-edit.component.html',
  styleUrls: ['./type-permission-edit.component.scss']
})
export class TypePermissionEditComponent extends BaseComponent<TypePermission> implements OnInit {

  public baseObject: TypePermission = new TypePermission();

  public getService(){
    return this.typePermissionService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private typePermissionService: TypePermissionService
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
