import {NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';

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
import {MonetaryPipe} from "./pipes/monetary.pipe";
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { DetailedEmployeeComponent } from './components/detailed-employee/detailed-employee.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { LoginComponent } from './components/login/login.component';
import { AddingEmployeesComponent } from './components/adding-employees/adding-employees.component';
import { PaginationPipe } from './pipes/pagination.pipe';
import { DialogWindowComponent } from './components/dialog-window/dialog-window.component';
import { ActiveEmployeesComponent } from './components/active-employees/active-employees.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DismissedEmployeesComponent } from './components/dismissed-employees/dismissed-employees.component';
import { ErrorHandlerService } from './services/error-handler.service';
import { StatusEmployeeDirective } from './directives/status-employee.directive';
import { MyForDirective } from './directives/my-for.directive';
import { ToastComponent } from './components/toast/toast.component';
import { EmployeesSkeletonComponent } from './components/employees-skeleton/employees-skeleton.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ActiveEmployeesComponent,
    EmployeeComponent,
    MonetaryPipe,
    HeaderComponent,
    SearchComponent,
    FilterPipe,
    FilterComponent,
    SearchComponent,
    DetailedEmployeeComponent,
    AddingEmployeesComponent,
    DialogWindowComponent,
    PaginationPipe,
    StatusEmployeeDirective,
    DismissedEmployeesComponent,
    MyForDirective,
    ToastComponent,
    EmployeesSkeletonComponent
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
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    FilterPipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
