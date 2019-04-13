import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { ProfileService } from 'src/app/services/register/profile.service';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/model/profile.model';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent extends BaseComponent<Profile> implements OnInit {

  public baseObject: Profile = new Profile();

  public getService() {
    return this.profileService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService
  ) {
    super();
    if (data.id) {
      this.findById(data.id);
    }

    if (data.readOnly) {
      this.readOnlyForm = data.readOnly;
    }
  }

  ngOnInit() {
  }

}
