import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { TypeContract } from 'src/app/model/types/typeOfContract.model';
import { TypeContractService } from 'src/app/services/types/type-contract.service';
import { CrudBaseService } from 'src/app/services/interface/crud.interface.service';

import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-type-contract-edit',
  templateUrl: './type-contract-edit.component.html',
  styleUrls: ['./type-contract-edit.component.scss']
})
export class TypeContractEditComponent extends BaseComponent<TypeContract> implements OnInit {

  public baseObject: TypeContract = new TypeContract();

  public getService(): CrudBaseService<TypeContract>  {
    return this.typeContractService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private typeContractService: TypeContractService
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
