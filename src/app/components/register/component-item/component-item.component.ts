import { ComponentItemEditComponent } from './../component-item-edit/component-item-edit.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogService } from 'src/app/dialog.service';
import { SharedService } from 'src/app/services/shared.service';
import { ComponentItemService } from 'src/app/services/register/component-item.service';
import { ComponentItem } from 'src/app/model/component-item.model';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { ResponseApi } from 'src/app/model/response.api';

@Component({
  selector: 'app-component-item',
  templateUrl: './component-item.component.html',
  styleUrls: ['./component-item.component.scss']
})
export class ComponentItemComponent extends TablepaginatedComponent<ComponentItem> implements OnInit {

  componentItemModel: ModelGenericTable[] = new Array();
  searchModel: SearchFields[] = new Array();
  childView = ComponentItemEditComponent;
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<ComponentItem>;

  constructor(
    private componentItemService: ComponentItemService,
    private sharedService: SharedService,
    private dialog: DialogService,
    private modal: MatDialog
  ) {
    super(sharedService)
    this.createModel();
  }

  ngOnInit() {
  }

  private createModel() {
    let model = new ModelGenericTable();
    model.fieldClassName = 'componentItemIdHTML';
    model.canonicClassName = 'ID HTML';
    model.typeFieldName = 'string';
    this.componentItemModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'appComponent';
    model.canonicClassName = 'Componente Vinculado';
    model.subFieldName = 'componentName';
    model.typeFieldName = 'object';
    this.componentItemModel.push(model);

    const search = new SearchFields();
    search.canonicName = 'Componente';
    search.type = SearchType.Text;
    search.name = 'text';
    this.searchModel.push(search);

  }

  search(event) {
    if (event) {
      this.message = '';
      this.componentItemService.fullSearch(event.text).subscribe((response: ResponseApi) => {
        this.tablePagination.listObject = response.data;
        this.tablePagination.pages = [];
        this.tablePagination.first = true;
        this.tablePagination.last = true;
        this.tablePagination.totalElements = response.data.length;
        this.tablePagination.paginator.pageSize = response.data.length;
        this.tablePagination.paginator.disabled = true;
      }, err => {
        this.dialog.showSnackMessage('error', err.error.errors ? err.error.errors[0] : err.error.message);
      });
    }
  }
}
