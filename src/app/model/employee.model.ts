import { Person } from './person.model';
import { Role } from './role.model';
import { formatDate } from '@angular/common';

export class Employee {
    employeeId: string;
    person: Person = new Person();
    role: Role = new Role();
    salary: number;
    hireDate: Date;
    fireDate: Date;
}