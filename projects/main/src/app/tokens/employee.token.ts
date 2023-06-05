import { InjectionToken, inject } from "@angular/core";
import { EmployeeService } from "../services/employee.service";
import { IEmployee } from "../interfaces/employee.interface";
import { Router } from "@angular/router";
import { Observable, switchMap, of } from 'rxjs';

export const EMPLOYEES_TOKEN: InjectionToken<string> = new InjectionToken<string>('EMPLOYEES_TOKEN');

export const employeesFactory = (): Observable<IEmployee[]> => {
  const employeeService: EmployeeService = inject(EmployeeService);
  const router: Router = inject(Router);
  return employeeService.getEmployees()
    .pipe(
      switchMap((employees: IEmployee[]) => {
        return of(employees.filter((employee: IEmployee) => {
          return router.url === '/dashboard' ? !employee.status.includes('Уволен') : employee.status.includes('Уволен');
        }));
      })
    );
};