import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ActiveEmployeesComponent } from './components/active-employees/active-employees.component';

import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiTextfieldControllerModule, TuiSvgModule
} from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {TuiAvatarModule, TuiBadgeModule, TuiInputModule} from "@taiga-ui/kit";
import { EmployeeBlockComponent } from './components/employee-block/employee-block.component';
import {MonetaryPipe} from "./pipes/monetary.pipe";
import { HeaderComponent } from './components/header/header.component';
import {SearchPipe} from "./pipes/search.pipe";
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ActiveEmployeesComponent,
    EmployeeBlockComponent,
    MonetaryPipe,
    HeaderComponent,
    SearchPipe,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiSvgModule,
    FormsModule
  ],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
