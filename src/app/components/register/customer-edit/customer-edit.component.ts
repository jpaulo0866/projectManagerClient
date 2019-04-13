import { Component, OnInit, Inject, Input } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { Customer } from 'src/app/model/customer.model';
import { TypeContract } from 'src/app/model/types/typeOfContract.model';
import { Address } from 'src/app/model/shared/address.model';
import { Contact } from 'src/app/model/shared/contact.model';
import { Contract } from 'src/app/model/contract.model';
import { CustomerService } from 'src/app/services/register/customer.service';
import { ContractService } from 'src/app/services/register/contract.service';
import { DialogService } from 'src/app/dialog.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/register/user.service';
import { ResponseApi } from 'src/app/model/response.api';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent extends BaseComponent<Customer> implements OnInit {
  hideFields: string[];

  public baseObject: Customer = new Customer();
  public typeOfContracts: TypeContract[] = new Array();
  public listAddress: Address[];
  public listContact: Contact[];
  public listContract: Contract[];
  public selectedUser: User;
  public selectedContract: Contract;

  // hideFields = ['contractId', 'disabled'];

  public getService() {
    return this.customerService;
  }

  contact = new Contact();
  address = new Address();

  constructor(
    private customerService: CustomerService,
    private userService: UserService,
    private contractService: ContractService,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    if (data.id) {
      this.findById(data.id);
    }

    if (data.readOnly) {
      this.readOnlyForm = data.readOnly;
    }

    this.loadComboCustomerUserManager();
    this.loadComboContract();
    // this.baseObject.contractHourPackage = this.hourPackage;
  }

  addContract() {
    if (this.baseObject.contracts.filter(item => item.contractId === this.selectedContract.contractId).length === 0) {
      this.baseObject.contracts.push(this.selectedContract);
    } else {
      this.dialogService.showSnackMessage('Contrato já adicionado', '');
    }
  }

  addAddress(event: Address) {
    if (!this.baseObject.customerAddress) {
      this.baseObject.customerAddress = new Array();
    }
    if (this.baseObject.customerAddress.filter(item => item.addressCity === event.addressCity).length > 0) {
      this.dialogService.showSnackMessage('Endereço já foi atribuído', '');
    } else {
      this.baseObject.customerAddress.push(event);
    }
  }

  addContact(event: Contact) {
    if (!this.baseObject.customerContacts) {
      this.baseObject.customerContacts = new Array();
    }

    if (this.baseObject.customerContacts.filter(item => item.value === event.value).length > 0) {
      this.dialogService.showSnackMessage('Contato já foi atribuído', '');
    } else {
      this.baseObject.customerContacts.push(event);
    }
  }

  removeContact(value: string) {
    const tempArray = this.baseObject.customerContacts.filter(item => item.value === value);
    if (tempArray.length === 1) {
      const index = this.baseObject.customerContacts.indexOf(tempArray[0]);
      if (index > -1) {
        this.baseObject.customerContacts.splice(index, 1);
      }
    }
  }

  removeAddress(address: Address) {
    const index = this.baseObject.customerAddress.indexOf(address);
    if (index > -1) {
      this.baseObject.customerAddress.splice(index, 1);
    }
  }

  remove(id: string) {
    const tempArray = this.baseObject.contracts.filter(item => item.contractId === id);
    if (tempArray.length === 1) {
      const index = this.baseObject.contracts.indexOf(tempArray[0]);
      if (index > -1) {
        this.baseObject.contracts.splice(index, 1);
      }
    }
  }

  loadComboCustomerUserManager() {
    this.userService.findAll(0, 50).subscribe((response: ResponseApi) => {
      this.selectedUser = response.data.content;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error.errors ? err.error.errors[0] : err.error.message
      });
    });
  }

  loadComboContract() {
    this.contractService.findAll(0, 50).subscribe((response: ResponseApi) => {
      this.listContract = response.data.content;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error.errors ? err.error.errors[0] : err.error.message
      });
    });
  }

  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist.contractId === idSecond.contractId;
  }
  hideField(name: string) {
    return this.hideFields && this.hideFields.includes(name);
  }

  ngOnInit() {

  }

}
