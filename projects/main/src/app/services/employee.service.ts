import { Injectable } from '@angular/core';
import { IEmployee } from "../interfaces/employee.interface";

import { Employees } from '../mock/mock-employees';
import {filter, from, Observable, of, ReplaySubject, Subject} from 'rxjs';
import {Actions, IAction, IActionEdit} from "../mock/mock-actions";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employee: IEmployee = {} as IEmployee;
  // public employees = of(Employees);
  // public employeesActions = new ReplaySubject<string[]>();

  setEmployee(employee: IEmployee): void{
    this.employee = employee;
  }

  getEmployee(): IEmployee{
    const res = this.employee;
    this.clearEmployee();
    return res;
  }

  addEmployee(employee:IEmployee): void {
    Employees.push(employee);
  }

  clearEmployee(): void{
    this.employee = {} as IEmployee;
  }

  getEmployees(): Observable<IEmployee[]> {
    const employees = of(Employees);
    return employees;
  }

  getEmployeeActions(id_owner: number): Observable<object> {
    const actions: Observable<object> = from(Actions)
      .pipe(filter(action => action.id_owner == id_owner));
    return actions;
  }

  addAction(action: any): void {
    Actions.push(action);
  }

  editEmployees(id: number, field: string, newValue: string | number): void {
    const key = field as keyof IEmployee;
    const employee = Employees.find(emp => emp.id == id);
    if (employee != undefined) {
      console.log(employee);
        employee[key] = newValue as never;
      console.log(employee[key]);
    }
    // console.log(res);
  }

  // getEmployee(id: number): IEmployee {
  //   const employee: IEmployee = Employees.find(el => el.id === id)!;
  //   console.log(employee)
  //   return employee;
  // }
}
