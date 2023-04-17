import {Component, OnInit} from '@angular/core';
import { IEmployee } from "../../interfaces/employee.interface";
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-block',
  templateUrl: './employee-block.component.html',
  styleUrls: ['./employee-block.component.css']
})

export class EmployeeBlockComponent implements OnInit {
  employee?: IEmployee;
  employees: IEmployee[] = [];
  // success = 'background-color: #FEEBE4;';
  success_circle = 'background-color: #4AC99B';
  searchText = ""

  constructor(private employeeService: EmployeeService) { }

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
}
