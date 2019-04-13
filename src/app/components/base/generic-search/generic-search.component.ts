import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchFields, SearchType } from 'src/app/model/search.fields';

@Component({
  selector: 'app-generic-search',
  templateUrl: './generic-search.component.html',
  styleUrls: ['./generic-search.component.scss']
})
export class GenericSearchComponent implements OnInit {
  @Input() searchFields: SearchFields[];
  @Input() searchTitle: string;
  @Output() searchEvent: EventEmitter<any> = new EventEmitter();
  searchObject = {};
  textType = SearchType.Text;
  checkType = SearchType.CheckBox;
  selectType = SearchType.Select;

  constructor() { }

  ngOnInit() {
  }

  clearFields() {
    this.searchObject = {};
  }

  search() {
    const values = Object.values(this.searchObject);
    const filtered = values.filter((item) => (item));
    this.searchEvent.emit(filtered.length > 0 ? this.searchObject : null);
  }

}
