import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ActiveEmployeesComponent } from './components/active-employees/active-employees.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ActiveEmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
