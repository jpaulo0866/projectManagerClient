import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  toggledMenu = new EventEmitter<boolean>();

  constructor() { }
}
