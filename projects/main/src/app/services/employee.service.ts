import { Injectable } from '@angular/core';
import { Employee } from "../employees/employee.interface";
import { Employees } from '../employees/mock-employees';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  getEmployees(): Observable<Employee[]> {
    const employees = of(Employees);
    return employees;
  }
}
