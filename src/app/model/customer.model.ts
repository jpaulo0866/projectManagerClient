import { User } from './user.model';
import { Address } from './shared/address.model';
import { Contact } from './shared/contact.model';
import { Contract } from './contract.model';

export class Customer {
    public customerId: string;
    public customerCnpj: string;
    public customerName: string;
    public disabled = false;
    public customerUserManager: User;
    public customerAddress: Array<Address> = new Array();
    public customerContacts: Array<Contact> = new Array();
    public contracts: Array<Contract> = new Array();
}