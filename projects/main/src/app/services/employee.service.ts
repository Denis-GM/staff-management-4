import {inject, Injectable, InjectionToken} from '@angular/core';
import { IEmployee } from "../interfaces/employee.interface";

import { Employees } from '../mock/mock-employees';
import { filter, from, Observable, of, switchMap } from 'rxjs';
import { Actions } from "../mock/mock-actions";
import { Router } from '@angular/router';
import {IAction} from "../interfaces/action.interface";

export const EMPLOYEES_TOKEN: InjectionToken<string> = new InjectionToken<string>('EMPLOYEES_TOKEN');

export const employeesFactory = (): Observable<IEmployee[]> => {
  const employeeService: EmployeeService = inject(EmployeeService);
  const router: Router = inject(Router);

  return employeeService.getEmployees()
    .pipe(
      switchMap((employees: IEmployee[]) => {
        return of(employees.filter((employee: IEmployee) => {
          return router.url === '/dashboard' ? !employee.status.includes('Уволен'): employee.status.includes('Уволен');
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
    const res: IEmployee = this.employee;
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
    return of(Employees);
  }

  getEmployeeActions(id_owner: number): Observable<object> {
    return from(Actions)
      .pipe(filter((action: IAction) => action.id_owner == id_owner));
  }

  addAction(action: IAction): void {
    Actions.push(action);
  }

  editEmployees(id: number, field: string, newValue: string | number): void {
    const key: keyof IEmployee = field as keyof IEmployee;
    const employee: IEmployee | undefined = Employees.find((emp: IEmployee) => emp.id == id);
    if (employee != undefined) {
      console.log(employee);
        employee[key] = newValue as never;
      console.log(employee[key]);
    }
  }
}
