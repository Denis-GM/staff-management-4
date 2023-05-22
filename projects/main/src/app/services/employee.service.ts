import { Injectable } from '@angular/core';
import { IEmployee } from "../interfaces/employee.interface";

import { Employees } from '../mock/mock-employees';
import { Observable, of } from 'rxjs';

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

  addEmployee(employee:IEmployee): void{
    Employees.push(employee);
  }

  clearEmployee(): void{
    this.employee = {} as IEmployee;
  }

  getEmployees(): Observable<IEmployee[]> {
    const employees = of(Employees);
    return employees;
  }

  // getEmployee(id: number): IEmployee {
  //   const employee: IEmployee = Employees.find(el => el.id === id)!;
  //   console.log(employee)
  //   return employee;
  // }
}
