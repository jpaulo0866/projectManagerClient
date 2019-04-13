import { Person } from './person.model';
import { HourPackage } from './hourPackage.model';
import { TypeContract } from './types/typeOfContract.model';

export class Contract{
    contractId: string;
    contractName: string;
    disabled: boolean;
    typeOfContract: TypeContract;
    contractHourPackage: HourPackage;
    contractRelatedPerson: Array<Person>;
}