import {inject, Injectable, InjectionToken} from '@angular/core';
import { IEmployee } from "../interfaces/employee.interface";

import { Employees } from '../mock/mock-employees';
import { filter, from, Observable, of, switchMap } from 'rxjs';
import { Actions } from "../mock/mock-actions";
import { Router } from '@angular/router';

export const EMPLOYEES_TOKEN: InjectionToken<string> = new InjectionToken<string>('EMPLOYEES_TOKEN');

export const employeesFactory = (): Observable<IEmployee[]> => {
  const employeeService: EmployeeService = inject(EmployeeService);
  const router: Router = inject(Router);

  return employeeService.getEmployees()
    .pipe(
      switchMap((employees: IEmployee[]) => {

        return of(employees.filter((employee: IEmployee) => {
          return router.url === '/dashboard' ? !employee.success.includes('Уволен'): employee.success.includes('Уволен');
        }));
      })
    );
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employee: IEmployee = {} as IEmployee;

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
