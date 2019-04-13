import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { Role } from 'src/app/model/role.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { RoleService } from 'src/app/services/register/role.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent extends BaseComponent<Role> implements OnInit {

  public baseObject: Role = new Role();

  public getService(){
    return this.roleService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService
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
