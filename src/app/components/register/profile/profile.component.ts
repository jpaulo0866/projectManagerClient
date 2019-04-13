import { Component, OnInit, ViewChild } from '@angular/core';
import { Profile } from 'src/app/model/profile.model';
import { ProfileService } from 'src/app/services/register/profile.service';
import { TablepaginatedComponent } from '../../base/tablepaginated/tablepaginated.component';
import { DialogService } from 'src/app/dialog.service';
import { ModelGenericTable } from 'src/app/model/generic.table';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialog } from '@angular/material';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { SearchFields, SearchType } from 'src/app/model/search.fields';
import { ResponseApi } from 'src/app/model/response.api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends TablepaginatedComponent<Profile> implements OnInit {
  profileModel: ModelGenericTable[] = new Array();
  searchModel: SearchFields[] = new Array();
  childView = ProfileEditComponent;
  @ViewChild(TablepaginatedComponent) tablePagination: TablepaginatedComponent<Profile>;

  constructor(
    private profileService: ProfileService,
    private sharedService: SharedService,
    private dialog: DialogService,
    private modal: MatDialog
  ) {
    super(sharedService);
    this.createModel();
  }

  ngOnInit() {
  }

  private createModel() {
    let model = new ModelGenericTable();
    model.fieldClassName = 'profileName';
    model.canonicClassName = 'Nome do Perfil';
    model.typeFieldName = 'string';
    this.profileModel.push(model);

    model = new ModelGenericTable();
    model.fieldClassName = 'disabled';
    model.canonicClassName = 'Perfil Desabilitado?';
    model.typeFieldName = 'boolean';
    this.profileModel.push(model);

    const search = new SearchFields();
    search.canonicName = 'Nome do Perfil';
    search.type = SearchType.Text;
    search.name = 'profileName';
    this.searchModel.push(search);
  }

  search(event) {
    if (event) {
      this.message = '';
      this.profileService.findByName(event.profileName).subscribe((response: ResponseApi) => {
        this.tablePagination.listObject = response.data;
        this.tablePagination.pages = [];
        this.tablePagination.first = true;
        this.tablePagination.last = true;
        this.tablePagination.totalElements = response.data.length;
        this.tablePagination.paginator.pageSize = response.data.length;
        this.tablePagination.paginator.disabled = true;
      }, err => {
        this.dialog.showSnackMessage('error' , err.error.errors ? err.error.errors[0] : err.error.message);
      });
    }
  }
}
