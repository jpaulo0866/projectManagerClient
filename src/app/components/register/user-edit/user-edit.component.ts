import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { BaseComponent } from '../../base/impl/base.component';
import { CrudBaseService } from 'src/app/services/interface/crud.interface.service';
import { UserService } from 'src/app/services/register/user.service';
import { ProfileService } from 'src/app/services/register/profile.service';
import { Profile } from 'src/app/model/profile.model';
import { ResponseApi } from 'src/app/model/response.api';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormControl } from '@angular/forms';
import { Person } from 'src/app/model/person.model';
import { PersonService } from 'src/app/services/register/person.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends BaseComponent<User> implements OnInit {

  public baseObject: User = new User();
  public profiles: Profile[] = new Array();
  hideFields = ['personId', 'disabled'];

  public getService(): CrudBaseService<User> {
    return this.userService;
  }

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private personService: PersonService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
    super();
    if (data.id) {
      this.findById(data.id);
    }

    if (data.readOnly) {
      this.readOnlyForm = data.readOnly;
    }
    this.baseObject.person = new Person();
    this.loadCombo();
  }

  findById(id: string) {
    this.message = '';
    this.getService().findById(id).subscribe((response: ResponseApi) => {
      this.baseObject = response.data;
      if (!this.baseObject.person
        || !this.baseObject.person.cpf
        || !this.baseObject.person.firstName) {
      }
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error.errors ? err.error.errors[0] : err.error.message
      });
    });
  }

  loadCombo() {
    this.profileService.findAll(0, 50).subscribe((response: ResponseApi) => {
      this.profiles = response.data.content;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error.errors ? err.error.errors[0] : err.error.message
      });
    });
  }

  ngOnInit() {
  }

  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist.profileId === idSecond.profileId;
  }

  onFileChange(event): void {
    if (event.target.files[0].size > 5000000) {
      this.showMessage({
        type: 'error',
        text: 'Maximum image size is 5mb'
      });
    } else {
      this.baseObject.image = '';
      const reader = new FileReader();
      reader.onloadend = (e: Event) => {
        this.baseObject.image = reader.result.toString();
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  save() {
    this.message = '';
    this.personService.createOrUpdate(this.baseObject.person).subscribe((response: ResponseApi) => {
      this.baseObject.person = response.data;
      this.userService.createOrUpdate(this.baseObject).subscribe((response: ResponseApi) => {
        this.baseObject = response.data;
      }, err => {
        this.showMessage({
          type: 'error',
          text: err.error.errors ? err.error.errors[0] : err.error.message
        });
      });
    });
  }
}
