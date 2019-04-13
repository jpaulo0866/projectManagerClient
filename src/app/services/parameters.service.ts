import { Injectable } from '@angular/core';
import properties from '../../../properties.json';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  constructor() { }

  getValueFromProperties(paramName: string): any {
    return properties[paramName];
  }
}
