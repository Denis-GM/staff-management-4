import { Injectable } from '@angular/core';
import { IEmployee } from "../interfaces/employee.interface";
import { Employees } from '../mock/mock-employees';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  getEmployees(): Observable<IEmployee[]> {
    const employees = of(Employees);
    return employees;
  }
}
