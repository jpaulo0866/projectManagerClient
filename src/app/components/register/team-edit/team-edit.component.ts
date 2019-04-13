import { Component, OnInit, Inject } from '@angular/core';
import { Team } from 'src/app/model/team.model';
import { BaseComponent } from '../../base/impl/base.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TeamService } from 'src/app/services/register/team.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/register/user.service';
import { DialogService } from 'src/app/dialog.service';
import { ResponseApi } from 'src/app/model/response.api';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent extends BaseComponent<Team> implements OnInit {

  public baseObject: Team = new Team();
  public selected: User;
  public listUsers: User[];

  public getService() {
    return this.teamService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamService: TeamService,
    private userService: UserService,
    private dialogService: DialogService
  ) {
    super();
    this.baseObject.users = new Array();
    if (data.id) {
      this.findById(data.id);
    }

    if (data.readOnly) {
      this.readOnlyForm = data.readOnly;
    }

    this.loadCombo();
  }

  ngOnInit() {
  }

  addUser() {
    if (this.baseObject.users.filter(item => item.userId === this.selected.userId).length === 0) {
      this.baseObject.users.push(this.selected);
    } else {
      this.dialogService.showSnackMessage('Usuário já é membro da equipe', '');
    }
  }

  remove(id: string) {
    const tempArray = this.baseObject.users.filter(item => item.userId === id);
    if (tempArray.length === 1) {
      const index = this.baseObject.users.indexOf(tempArray[0]);
      if (index > -1) {
        this.baseObject.users.splice(index, 1);
      }
    }
  }

  loadCombo() {
    this.userService.findAll(0, 100).subscribe((response: ResponseApi) => {
      this.listUsers = response.data.content;
    }, err => {
      this.dialogService.showSnackMessage(
        'error',
        err.error.errors ? err.error.errors[0] : err.error.message
      );
    });
  }

  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist.userId === idSecond.userId;
  }

}
