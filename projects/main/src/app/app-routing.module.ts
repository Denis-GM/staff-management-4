import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guards/auth.guard';
import { LoggedInAuthGuard } from './guards/logged-in-auth.guard';
import {DetailedEmployeeComponent} from "./components/detailed-employee/detailed-employee.component";
import {AddingEmployeesComponent} from "./components/adding-employees/adding-employees.component";
import { ActiveEmployeesComponent } from './components/active-employees/active-employees.component';
import {DismissedEmployeesComponent} from "./components/dismissed-employees/dismissed-employees.component";


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent, canActivate: [LoggedInAuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard]},
  { path: 'dashboard', component: ActiveEmployeesComponent, canActivate: [AuthGuard]},
  { path: 'dashboard/employee/:id', component: DetailedEmployeeComponent, canActivate: [AuthGuard]},
  { path: 'fired', component: DismissedEmployeesComponent, canActivate: [AuthGuard]},
  { path: 'fired/employee/:id', component: DetailedEmployeeComponent, canActivate: [AuthGuard]},
  { path: 'adding', component: AddingEmployeesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
