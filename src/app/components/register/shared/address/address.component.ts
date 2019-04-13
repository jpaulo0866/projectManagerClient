import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Address } from 'src/app/model/shared/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() address: Address;
  @Input() readOnlyForm: boolean;
  @Output() addAddress = new EventEmitter<Address>();

  constructor() { }

  ngOnInit() {
  }

  addEvent(){
    this.addAddress.emit(this.address);
    this.clearAddress();
  }

  clearAddress() {
    this.address = new Address();
  }
}