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
  TuiTextfieldControllerModule, TuiSvgModule, TuiButtonModule
} from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  TuiAvatarModule,
  TuiBadgeModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputRangeModule,
  TuiInputTagModule, TuiPaginationModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import { EmployeeBlockComponent } from './components/employee-block/employee-block.component';
import {MonetaryPipe} from "./pipes/monetary.pipe";
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { DetailedEmployeeComponent } from './components/detailed-employee/detailed-employee.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { LoginComponent } from './components/login/login.component';
import { AddingEmployeesComponent } from './components/adding-employees/adding-employees.component';
import { BtnBackComponent } from './components/btn-back/btn-back.component';
import { PaginationPipe } from './pipes/pagination.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ActiveEmployeesComponent,
    EmployeeBlockComponent,
    MonetaryPipe,
    HeaderComponent,
    SearchComponent,
    FilterPipe,
    FilterComponent,
    SearchComponent,
    DetailedEmployeeComponent,
    AddingEmployeesComponent,
    BtnBackComponent,
    PaginationPipe,
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
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiSvgModule,
    FormsModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiInputRangeModule,
    TuiInputTagModule,
    TuiPaginationModule,
  ],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
