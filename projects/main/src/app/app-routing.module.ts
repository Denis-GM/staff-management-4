import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveEmployeesComponent } from './components/active-employees/active-employees.component';

import { RegistrationComponent } from './components/registration/registration.component';

import { AuthGuard } from './guards/auth.guard';
import { LoggedInAuthGuard } from './guards/logged-in-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent, canActivate: [LoggedInAuthGuard]},
  { path: 'main', component: ActiveEmployeesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
