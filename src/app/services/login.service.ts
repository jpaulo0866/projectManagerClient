import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParametersService } from './parameters.service';
import { SharedService } from './shared.service';
import { Constants } from '../global/constants';
import { LoginUser } from '../model/login.model'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private parameterService: ParametersService
  ) { }

  login(user: LoginUser) {
    return this.http.post(`${this.parameterService.getValueFromProperties(Constants.API_URL)}/api/auth`, user);
  }

  getUserImage(login: string) {
    return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}/api/auth/user/image/${login}`);
  }
}
