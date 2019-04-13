import { Injectable, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/user.model';
import { JwtUser } from '../model/jwtUser.model';
import { Constants } from '../global/constants';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private jwtJson: string;
  private jwt: JwtUser;
  user: User;
  token: string;
  loggerUser = new EventEmitter<boolean>();
  userName = '';

  constructor(
    private ngRouter: Router,
    public cookieService: CookieService) {
    this.jwtJson = this.cookieService.get(Constants.COOKIE_JWT);
    if (this.jwtJson) {
      this.jwt = JSON.parse(this.jwtJson);
      this.user = this.jwt.user;
      this.user.image = localStorage.getItem(Constants.COOKIE_JWT_IMAGE);
      this.token = this.jwt.token;
      this.setUserName();
    }
  }

  setLoggedUser(loggedUser: JwtUser) {
    this.jwt = loggedUser;
    if (loggedUser) {
      this.user = loggedUser.user;
      this.token = loggedUser.token;
      localStorage.setItem(Constants.COOKIE_JWT_IMAGE, loggedUser.user.image);
      loggedUser.user.image = '';
      this.cookieService.set(Constants.COOKIE_JWT, JSON.stringify(loggedUser));
      this.loggerUser.emit(true);
      this.user.image = localStorage.getItem(Constants.COOKIE_JWT_IMAGE);
      this.setUserName();

    } else {
      this.user = null;
      this.token = null;
      this.cookieService.delete(Constants.COOKIE_JWT);
      localStorage.removeItem(Constants.COOKIE_JWT_IMAGE);
      this.loggerUser.emit(false);
      this.userName = '';
    }
  }

  isLoggedIn(): boolean {
    if (!this.user
      || !this.token) {
      return false;
    }
    return this.user.login !== '';
  }

  forceLogout() {
    this.setLoggedUser(null);
    this.ngRouter.navigate(['/login']);
  }

  setUserName() {
    this.userName = this.user.person ?
                    `${this.user.person.firstName} ${this.user.person.lastName}` 
                    : this.user.login;
  }
}
