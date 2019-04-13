import { TypeContractService } from 'src/app/services/types/type-contract.service';
import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { Contract } from 'src/app/model/contract.model';
import { Person } from 'src/app/model/person.model';
import { HourPackage } from 'src/app/model/hourPackage.model';
import { TypeContract } from 'src/app/model/types/typeOfContract.model';
import { DialogService } from 'src/app/dialog.service';
import { ContractService } from 'src/app/services/register/contract.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ResponseApi } from 'src/app/model/response.api';
import { PersonService } from 'src/app/services/register/person.service';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.scss']
})
export class ContractEditComponent extends BaseComponent<Contract> implements OnInit {

  public baseObject: Contract = new Contract();
  public typeOfContracts: TypeContract[] = new Array();
  public hourPackage: HourPackage = new HourPackage();
  public listPeople: Person[];
  public selected: Person;

  hideFields = ['contractId', 'disabled'];

  public getService() {
    return this.contractService;
  }

  constructor(
    private contractService: ContractService,
    private typeOfContractService: TypeContractService,
    private personService: PersonService,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.baseObject.contractRelatedPerson = new Array();
    if (data.id) {
      this.findById(data.id);
    }

    if (data.readOnly) {
      this.readOnlyForm = data.readOnly;
    }

    this.loadComboPerson();
    this.loadComboTypeOfContract();
    this.baseObject.contractHourPackage = this.hourPackage;
  }

  addPerson() {
    if (this.baseObject.contractRelatedPerson.filter(item => item.personId === this.selected.personId).length === 0) {
      this.baseObject.contractRelatedPerson.push(this.selected);
    } else {
      this.dialogService.showSnackMessage('Pessoa já é membro da equipe', '');
    }
  }

  remove(id: string) {
    const tempArray = this.baseObject.contractRelatedPerson.filter(item => item.personId === id);
    if (tempArray.length === 1) {
      const index = this.baseObject.contractRelatedPerson.indexOf(tempArray[0]);
      if (index > -1) {
        this.baseObject.contractRelatedPerson.splice(index, 1);
      }
    }
  }

  loadComboTypeOfContract() {
    this.typeOfContractService.findAll(0, 50).subscribe((response: ResponseApi) => {
      this.typeOfContracts = response.data.content;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error.errors ? err.error.errors[0] : err.error.message
      });
    });
  }

  loadComboPerson() {
    this.personService.findAll(0, 100).subscribe((response: ResponseApi) => {
      this.listPeople = response.data.content;
    }, err => {
      this.dialogService.showSnackMessage(
        'error',
        err.error.errors ? err.error.errors[0] : err.error.message
      );
    });
  }

  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist.personId === idSecond.personId;
  }

  ngOnInit() {

  }
}
