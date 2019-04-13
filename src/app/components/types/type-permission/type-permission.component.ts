import { Component, OnInit } from '@angular/core';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { TypePermission } from 'src/app/model/types/typePermission';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { TypePermissionEditComponent } from '../type-permission-edit/type-permission-edit.component';
import { TypePermissionService } from 'src/app/services/types/type-permission.service';
import { SharedService } from 'src/app/services/shared.service';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-type-permission',
  templateUrl: './type-permission.component.html',
  styleUrls: ['./type-permission.component.scss']
})
export class TypePermissionComponent extends TablepaginatedComponent<TypePermission> implements OnInit {

  typePermission: TypePermission = new TypePermission();
  typePermissionModel: ModelGenericTable[]= new Array();
  childView = TypePermissionEditComponent;

  constructor(
    private typePermissionService: TypePermissionService,
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
    model.fieldClassName = 'typePermissionName';
    model.canonicClassName = 'Tipo de Permissão'
    model.typeFieldName = 'string';
    this.typePermissionModel.push(model);



  }

}
