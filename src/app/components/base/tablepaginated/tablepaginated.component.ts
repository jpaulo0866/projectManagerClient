import { Component, OnInit, Input, ViewChild, TemplateRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { PaginationComponent } from '../impl/pagination.component';
import { IPaginationComponent } from '../interface/pagination.interface.component';
import { CrudBaseService } from 'src/app/services/interface/crud.interface.service';
import { ResponseApi } from 'src/app/model/response.api';
import { ModelGenericTable } from 'src/app/model/generic.table';
import moment from 'moment';
import { SharedService } from 'src/app/services/shared.service';
import { MatPaginator, PageEvent, MatDialog, MatTable, MatTab, MatSort, Sort } from '@angular/material';
import { Constants } from 'src/app/global/constants';
import { DialogService } from 'src/app/dialog.service';
import { ComponentType } from '@angular/cdk/portal';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tablepaginated',
  templateUrl: './tablepaginated.component.html',
  styleUrls: ['./tablepaginated.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TablepaginatedComponent<T> extends PaginationComponent<T> implements OnInit, IPaginationComponent {
  @Input() public headerTitle: string;
  @Input() public service: CrudBaseService<T>;
  @Input() public baseObject: T;
  @Input() public objectKey: string;
  @Input() public childPath: string;
  @Input() public createMethod;
  @Input() public editMethod;
  @Input() public detailMethod;
  @Input() public deleteMethod;
  @Input() public router;
  @Input() public tableModel: ModelGenericTable[];
  @Input() public dialogService: DialogService;
  @Input() public modalDialog: MatDialog;
  @Input() public childModal: ComponentType<T> | TemplateRef<T>;
  @Input() public generateSelection: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selection = new SelectionModel<T>(true, []);
  defaultDateFormat = 'dd/MM/yyyy';
  defaultFixed = 2;
  displayedColumns: string[];
  resultsLength = 0;
  isLoadingResults = false;
  listObject: T[] = new Array();
  findAllSubscription: Subscription;
  sortSubscription: Subscription;

  private containActionButtons() {
    return this.editMethod != null || this.detailMethod != null || this.deleteMethod != null
  }

  public getService(): CrudBaseService<T> {
    return this.service;
  }

  constructor(
    private shared: SharedService
  ) {
    super();
  }

  ngOnInit() {
    this.generateTableModel();
    this.displayedColumns = this.tableModel.map((item) => {
      return item.canonicClassName;
    });
    if (this.containActionButtons()) {
      this.displayedColumns.push('actions');
    }
    if (this.generateSelection) {
      this.displayedColumns.unshift('select');
    }
    this.findAll(this.page, this.count);
    this.subscribleDefaultPagination();
  }

  disableSubscription() {
    this.paginator.disabled = true;
    this.sort.disabled = true;
  }

  subscribleDefaultPagination() {
    this.findAllSubscription = this.paginator.page.subscribe((event: PageEvent) => {
      this.isLoadingResults = true;
      this.findAll(event.pageIndex, event.pageSize);
      this.isLoadingResults = false;
    });

    this.sortSubscription = this.sort.sortChange.subscribe((event: Sort) => {
      this.isLoadingResults = true;
      const fullTable = this.tableModel.filter((item) => item.canonicClassName === event.active);
      const model = fullTable.length > 0 ? fullTable[0] : new ModelGenericTable();
      this.findAll(this.paginator.pageIndex, this.paginator.pageSize, model.fieldClassName, event.direction);
      this.isLoadingResults = false;
    });
  }

  resetDefaultPagination() {
    this.subscribleDefaultPagination();
    this.paginator.pageIndex = 0;
    this.paginator.disabled = false;
    this.paginator.pageSize = this.count;
    this.sort.disabled = false;
    this.sort.active = null;
    this.findAll(this.paginator.pageIndex, this.paginator.pageSize);
  }

  openDialog(objectId?: string, infoOnly?: boolean) {
    const dialogRef = this.modalDialog.open(this.childModal, {
      data: {
        id: objectId,
        readOnly: infoOnly
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.findAll(this.paginator.pageIndex, this.paginator.pageSize);
        this.openSnackBar('Objeto salvo', '');
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listObject.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.listObject.forEach(row => this.selection.select(row));
  }

  checkboxLabel(i?: number, row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${i}`;
  }

  private generateTableModel() {
    if (!this.tableModel
      || this.tableModel.length === 0) {
        this.tableModel = new Array();
        Object.keys(this.baseObject).forEach((item) => {
          const model = new ModelGenericTable();
          model.canonicClassName = item;
          model.fieldClassName = item;
          model.isBitmap = item === 'image';
          model.formatField = this.defaultDateFormat;
          model.decimalFixed = this.defaultFixed;
          this.tableModel.push(model);
        });
    }
  }

  getFormatedValue(value: any, headerItem: ModelGenericTable): any {
    const fullTable = this.tableModel.filter((item) => item.fieldClassName === headerItem.fieldClassName 
                                                        && item.canonicClassName === headerItem.canonicClassName);
    const model = fullTable.length > 0 ? fullTable[0] : null;

    if (model && model.typeFieldName) {
      return this.getValueFromType(value, typeof value, model);
    } else {
      return this.getValueFromType(value, typeof value, null);
    }
  }

  private getValueFromType(value, type, model: ModelGenericTable) {
    const fixed = model != null ? model.decimalFixed : this.defaultFixed;
    const dateFormat = model != null ? model.formatField : this.defaultDateFormat;
    if (type === 'number') {
      return fixed ? value.toFixed(fixed) : value;
    } else if (type === 'object') {
      if (value != null) {
        if (model && model.subFieldName) {
          return value[model.subFieldName];
        } else {
          const values = Object.values(value);
          if (values.length > 1) {
            values.shift();
          }
          return values.filter((item) => typeof item === 'string').reduce((data, next) => `${data} ${next}`, '');
        }
      } else {
        return value;
      }
      // return value != null ? value.toString() != null ? value.toString() :
      //         Object.values(value).length > 1 ? Object.values(value)[1] : Object.values(value)[0] : value;
    } else if (this.isDate(value)) {
      return dateFormat != null ? moment(value).format(dateFormat) : value.toLocaleString();
    } else {
      return value;
    }
  }

  private isDate(value: any): boolean {
    try {
      if (moment(value).isValid()) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  log(item) {
    console.log(item);
  }

  create() {
    this.router.navigate([this.childPath]);
  }

  edit(id: string) {
    this.router.navigate([this.childPath, id]);
  }

  detail(id: string, infoOnly?: boolean) {
    this.router.navigate([this.childPath, id, true]);
  }

  delete(id: string) {
    this.dialogService.confirm(Constants.DELETE_MESSAGE).
    then((canDelete: boolean) => {
      if (canDelete) {
        this.message = {};
        this.service.delete(id).subscribe((responseApi: ResponseApi) => {
          this.openSnackBar('Record sucessfully deleted', '');
          this.findAll(this.paginator.pageIndex, this.paginator.pageSize);
        }, err => {
          this.showMessage({
            type: 'error',
            text: err.error.errors ? err.error.errors[0] : err.error.message
          });
        });
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.dialogService.showSnackMessage(message, action);
  }

}
