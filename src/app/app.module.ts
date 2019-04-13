import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthGuard } from './security/auth.guard';
import { AuthInterceptor } from './security/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from './services/shared.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './components/register/profile/profile.component';
import { ProfileEditComponent } from './components/register/profile-edit/profile-edit.component';
import { TablepaginatedComponent } from './components/base/tablepaginated/tablepaginated.component';
import { HttpErrorFilter } from './security/error.filter.interceptor';
import { UserComponent } from './components/register/user/user.component';
import { UserEditComponent } from './components/register/user-edit/user-edit.component';
import { DialogComponent } from './components/base/confirm/dialog.component';
import { TypeContactComponent } from './components/types/type-contact/type-contact.component';
import { TypeContactEditComponent } from './components/types/type-contact-edit/type-contact-edit.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { TeamComponent } from './components/register/team/team.component';
import { TeamEditComponent } from './components/register/team-edit/team-edit.component';
import { StatusComponent } from './components/types/status/status.component';
import { StatusEditComponent } from './components/types/status-edit/status-edit.component';
import { MaterialModule } from './modules/material.module';
import { GenericSearchComponent } from './components/base/generic-search/generic-search.component';
import { PersonComponent } from './components/register/person/person.component';
import { PersonEditComponent } from './components/register/person-edit/person-edit.component';
import { ContactComponent } from './components/register/shared/contact/contact.component';
import { AddressComponent } from './components/register/shared/address/address.component';
import { PersonRenderComponent } from './components/register/shared/person-render/person-render.component';
import { ProjectTypeComponent } from './components/project/projectType/projectType.component';
import { ProjectTypeEditComponent } from './components/project/projectType-edit/projectType-edit.component';
import { AppRouteComponent } from './components/register/app-route/app-route.component';
import { AppRouteEditComponent } from './components/register/app-route-edit/app-route-edit.component';
import { TypeContractComponent } from './components/types/type-contract/type-contract.component';
import { TypeContractEditComponent } from './components/types/type-contract-edit/type-contract-edit.component';
import { NgxMaskModule } from 'ngx-mask';
import { ProjectPriorityEditComponent } from './components/register/project-priority-edit/project-priority-edit.component';
import { ProjectPriorityComponent } from './components/register/project-priority/project-priority.component';
import { BugTypeComponent } from './components/types/bug-type/bug-type.component';
import { BugTypeEditComponent } from './components/types/bug-type-edit/bug-type-edit.component';
import { ProjectComplexityComponent } from './components/register/project-complexity/project-complexity.component';
import { ProjectComplexityEditComponent } from './components/register/project-complexity-edit/project-complexity-edit.component';
import { ProjectStageComponent } from './components/register/project-stage/project-stage.component';
import { ProjectStageEditComponent } from './components/register/project-stage-edit/project-stage-edit.component';
import { HelpMenuComponent } from './components/register/help-menu/help-menu.component';
import { HelpMenuEditComponent} from './components/register/help-menu-edit/help-menu-edit.component';
import { ContractComponent } from './components/register/contract/contract.component';
import { ContractEditComponent } from './components/register/contract-edit/contract-edit.component';
import { RoleComponent } from './components/register/role/role.component';
import { RoleEditComponent } from './components/register/role-edit/role-edit.component';
import { MenuRegisterComponent } from './components/register/menu/menu-register.component';
import { MenuRegisterEditComponent } from './components/register/menu-register-edit/menu-register-edit.component';
import { TypePermissionComponent } from './components/types/type-permission/type-permission.component';
import { TypePermissionEditComponent } from './components/types/type-permission-edit/type-permission-edit.component';
import { SubMenuComponent } from './components/register/sub-menu/sub-menu.component';
import { SubMenuEditComponent } from './components/register/sub-menu-edit/sub-menu-edit.component';
import { CustomerComponent } from './components/register/customer/customer.component';
import { CustomerEditComponent } from './components/register/customer-edit/customer-edit.component';
import { ComponentItemComponent } from './components/register/component-item/component-item.component';
import { ComponentItemEditComponent } from './components/register/component-item-edit/component-item-edit.component';
import { EmployeeComponent } from './components/register/employee/employee.component';
import { EmployeeEditComponent } from './components/register/employee-edit/employee-edit.component';
import { MaskTransformPipe } from './pipes/mask.transform.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MaskTransformPipe,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ProfileComponent,
    ProfileEditComponent,
    TablepaginatedComponent,
    UserComponent,
    UserEditComponent,
    DialogComponent,
    TypeContactComponent,
    TypeContactEditComponent,
    MyProfileComponent,
    TeamComponent,
    TeamEditComponent,
    StatusComponent,
    StatusEditComponent,
    GenericSearchComponent,
    PersonComponent,
    PersonEditComponent,
    ContactComponent,
    AddressComponent,
    PersonRenderComponent,
    ProjectTypeComponent,
    ProjectTypeEditComponent,
    AppRouteComponent,
    AppRouteEditComponent,
    TypeContractComponent,
    TypeContractEditComponent,
    ProjectPriorityEditComponent,
    ProjectPriorityComponent,
    BugTypeComponent,
    BugTypeEditComponent,
    ProjectComplexityComponent,
    ProjectComplexityEditComponent,
    RoleComponent,
    RoleEditComponent,
    ProjectStageComponent,
    ProjectStageEditComponent,
    ProjectComplexityEditComponent,
    HelpMenuComponent,
    HelpMenuEditComponent,
    ContractComponent,
    ContractEditComponent,
    ProjectComplexityEditComponent,
    MenuRegisterComponent,
    MenuRegisterEditComponent,
    TypePermissionComponent,
    TypePermissionEditComponent,
    SubMenuComponent,
    SubMenuEditComponent,
    CustomerComponent,
    CustomerEditComponent,
    ComponentItemComponent,
    ComponentItemEditComponent,
    EmployeeComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routes,
    NgxMaskModule.forRoot(),
    MaterialModule
  ],
  providers: [
    CookieService,
    SharedService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorFilter,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
    ProfileEditComponent,
    UserEditComponent,
    TypeContactEditComponent,
    MyProfileComponent,
    TeamEditComponent,
    StatusEditComponent,
    PersonEditComponent,
    ProjectTypeEditComponent,
    AppRouteEditComponent,
    TypeContractEditComponent,
    ProjectStageEditComponent,
    ProjectPriorityEditComponent,
    BugTypeEditComponent,
    ProjectComplexityEditComponent,
    HelpMenuEditComponent,
    ContractEditComponent,
    RoleEditComponent,
    SubMenuEditComponent,
    CustomerEditComponent,
    ComponentItemEditComponent,
    TypePermissionEditComponent,
    SubMenuEditComponent,
    MenuRegisterEditComponent,
    EmployeeEditComponent
  ]
})
export class AppModule { }
