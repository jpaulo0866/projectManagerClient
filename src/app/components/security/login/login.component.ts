import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/model/login.model';
import { SharedService } from 'src/app/services/shared.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { JwtUser } from 'src/app/model/jwtUser.model';
import { ResponseApi } from 'src/app/model/response.api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new LoginUser();
  message: string;
  userImage: string = null;
  loginUser: JwtUser;

  constructor(
    private shared: SharedService,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.shared.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  doLogin() {
    this.message = '';
    this.loginService.login(this.user).subscribe((userAuth: JwtUser) => {
      this.loginUser = userAuth;
      this.mover();
      // this.shared.setLoggedUser(userAuth);
      // this.router.navigate(['/']);
    }, err => {
      this.shared.setLoggedUser(null);
      this.message = `Unauthorized: ${err.status}
      Message: ${err.error.defaultMessage}`;
      this.router.navigate(['/login']);
    });
  }

  private mover() {
    let input_login = document.getElementById("input_login");
    let input_pass = document.getElementById("input_pass");
    let btn_login = document.getElementById("btn_login");
    let img_login = document.getElementById("img_login");
    input_login.style.display = "none";
    input_pass.style.display = "none";
    btn_login.style.display = "none";
    img_login.style.top = "50%";
    img_login.style.left = "50%";
    img_login.style.transform = "translate(-50%,-50%)";
    this.sleep(600).then(() => {
      img_login.style.transition = "1.5s";
      img_login.style.left = "96.68%";
      img_login.style.top = "5.07%";
      img_login.style.width = "50px";
      img_login.style.height = "50px";
      this.sleep(1600).then(() => {
        this.shared.setLoggedUser(this.loginUser);
        this.router.navigate(['/']);
      })
    });
  }

  private sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  cancelLogin() {
    this.message = '';
    this.user = new LoginUser();
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-sucess': !isInvalid
    };
  }

  getImage() {
    console.log('getImage()');
    this.loginService.getUserImage(this.user.login).subscribe((resp: ResponseApi) => {
      this.userImage = resp.data;
    });
  }

}
