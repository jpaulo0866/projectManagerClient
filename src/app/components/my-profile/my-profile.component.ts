import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/register/user.service';
import { DialogService } from 'src/app/dialog.service';
import { BaseComponent } from '../base/impl/base.component';
import { CrudBaseService } from 'src/app/services/interface/crud.interface.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent extends BaseComponent<User> implements OnInit {

  public baseObject: User;
  public getService(): CrudBaseService<User> {
    return this.userService;
  }

  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private dialogService: DialogService) {
      super();
      this.baseObject = this.sharedService.user;
  }

  ngOnInit() {
  }

  onFileChange(event): void {
    if (event.target.files[0].size > 5000000) {
      this.dialogService.showSnackMessage('error', 'Maximum image size is 5mb');
    } else {
      this.baseObject.image = '';
      const reader = new FileReader();
      reader.onloadend = (e: Event) => {
        this.baseObject.image = reader.result.toString();
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
