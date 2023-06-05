import { Injectable, InjectionToken, Inject, inject } from '@angular/core';
import { IEmployee } from "../interfaces/employee.interface";
import { filter, from, Observable, of, switchMap } from 'rxjs';
import { Actions } from "../mock/mock-actions";
import { IAction } from "../interfaces/action.interface";
import { LocalStorageService } from './local-storage.service';
import { Employees } from '../mock/mock-employees';
import { Router } from '@angular/router';

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

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  protected employees!: IEmployee[];

  constructor(
    @Inject(LocalStorageService) protected storageService: LocalStorageService
  ) {}

  getEmployee(id: number): IEmployee {
    this.employees = this.storageService.get('employees');
    const employee: IEmployee | undefined = this.employees.find((emp: IEmployee) => emp.id === +id);
    if(!employee) {
      throw new Error(`Сотрудник с id:${id} не найден!`);
    }
    return employee;
  }

  addEmployee(employee: IEmployee): void {
    this.employees = this.storageService.get('employees');
    this.employees.push(employee);
    this.storageService.save('employees', this.employees);
  }

  getEmployees(): Observable<IEmployee[]> {
    this.employees = this.storageService.get('employees');
    if(!this.employees) {
      this.storageService.save('employees', Employees);
      this.employees = Employees;
    }
    return of(this.employees.reverse());
  }

  getEmployeeActions(): Observable<IAction[]> {
    const actions: IAction[] = this.storageService.get('actions');
    if(!actions)
      this.storageService.save('actions', Actions);
    return of(actions);
  }

  addAction(action: IAction): void {
    const actions: IAction[] = this.storageService.get('actions');
    actions.push(action);
    this.storageService.save('actions', actions);
  }

  editEmployees(id: number, field: string, newValue: string | number): void {
    const employees: IEmployee[] = this.storageService.get('employees');
    const key: keyof IEmployee = field as keyof IEmployee;
    employees.map((emp: IEmployee) => {
      if(emp.id == id) emp[key] = newValue as never;
    });
    this.storageService.save('employees', employees);
  }
}
