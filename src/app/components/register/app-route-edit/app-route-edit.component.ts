import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base/impl/base.component';
import { AppRoute } from 'src/app/model/app-route.model';
import { Profile } from 'src/app/model/profile.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AppRouteService } from 'src/app/services/register/app-route.service';

@Component({
  selector: 'app-app-route-edit',
  templateUrl: './app-route-edit.component.html',
  styleUrls: ['./app-route-edit.component.scss']
})
export class AppRouteEditComponent extends BaseComponent <AppRoute> implements OnInit {

  public baseObject: AppRoute = new AppRoute();


  public getService(){
    return this.appRouteService;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private  appRouteService: AppRouteService
  ) {
    super();

    if(data.id){
    this.findById(data.id);
   }
   if(data.readOnly){
     this.readOnlyForm = data.readOnly;
   }
   }
   

  ngOnInit() {
  }

}
