import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveEmployeesComponent } from './components/active-employees/active-employees.component';

import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guards/auth.guard';
import { LoggedInAuthGuard } from './guards/logged-in-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent, canActivate: [LoggedInAuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard]},
  // { path: 'registration', component: RegistrationComponent},
  { path: 'dashboard', component: ActiveEmployeesComponent, canActivate: [AuthGuard]},
  // { path: 'main', component: ActiveEmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
