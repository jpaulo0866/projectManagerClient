import { EmployeeComponent } from './components/register/employee/employee.component';
import { ComponentItemComponent } from './components/register/component-item/component-item.component';
import { ContractComponent } from './components/register/contract/contract.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './security/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import { ProfileComponent } from './components/register/profile/profile.component';
import { UserComponent } from './components/register/user/user.component';
import { TypeContactComponent } from './components/types/type-contact/type-contact.component';
import { TeamComponent } from './components/register/team/team.component';
import { StatusComponent } from './components/types/status/status.component';
import { PersonComponent } from './components/register/person/person.component';
import { ProjectTypeComponent } from './components/project/projectType/projectType.component';
import { AppRouteComponent } from './components/register/app-route/app-route.component';
import { TypeContractComponent } from './components/types/type-contract/type-contract.component';
import { ProjectPriorityComponent } from './components/register/project-priority/project-priority.component';
import { BugTypeComponent } from './components/types/bug-type/bug-type.component';
import { RoleComponent } from './components/register/role/role.component';
import { ProjectStageComponent } from './components/register/project-stage/project-stage.component';
import { ProjectComplexityComponent } from './components/register/project-complexity/project-complexity.component';
import { MenuRegisterComponent } from './components/register/menu/menu-register.component';
import { TypePermissionComponent } from './components/types/type-permission/type-permission.component';
import { HelpMenuComponent } from './components/register/help-menu/help-menu.component';
import { SubMenuComponent } from './components/register/sub-menu/sub-menu.component';
import { CustomerComponent } from './components/register/customer/customer.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'typecontact',
        component: TypeContactComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'team',
        component: TeamComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'status',
        component: StatusComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'person',
        component: PersonComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'projectType',
        component: ProjectTypeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'approute',
        component: AppRouteComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'typecontract',
        component: TypeContractComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'projectpriority',
        component: ProjectPriorityComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'projectcomplexity',
        component: ProjectComplexityComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'contract',
        component: ContractComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'role',
        component: RoleComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'menu',
        component: MenuRegisterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'typepermission',
        component: TypePermissionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'bugtype',
        component: BugTypeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'submenu',
        component: SubMenuComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'helpmenu',
        component: HelpMenuComponent,
        canActivate: [AuthGuard]
    },
    {

        path: 'customer',
        component: CustomerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'componentitem',
        component: ComponentItemComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'projectstage',
        component: ProjectStageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'employee',
        component: EmployeeComponent,
        canActivate: [AuthGuard]
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
