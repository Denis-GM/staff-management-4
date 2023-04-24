import {Component, OnInit} from '@angular/core';
import { IEmployee } from "../../interfaces/employee.interface";
import { EmployeeService } from '../../services/employee.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-employee-block',
  templateUrl: './employee-block.component.html',
  styleUrls: ['./employee-block.component.css']
})

export class EmployeeBlockComponent implements OnInit {
  employees: IEmployee[] = [];
  // selectedEmployee: IEmployee = {} as IEmployee;
  searchText = ""
  searchTags:string[] = []

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.employees = employees
      });
  }
  applySearch(value:string):void{
    this.searchText = value
  }
  applyFilter(value:string[]):void{
    this.searchTags = value
  }

  selectEmployee(employee: IEmployee) {
    this.employeeService.setEmployee(employee);
    this.router.navigate(
      ['dashboard/employee/', employee.id],
      // { queryParams: { 'employee': JSON.stringify(employee) }}
      );
  }
}
