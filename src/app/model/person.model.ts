import { Contact } from './shared/contact.model';
import { Address } from './shared/address.model';

export class Person {
    public personId: string;
    public cpf: string;
    public firstName: string;
    public lastName: string;
    public contacts: Contact[] = new Array();
    public disabled: boolean;
    public addresses: Address[] = new Array();
}
