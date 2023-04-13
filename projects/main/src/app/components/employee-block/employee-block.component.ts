import {Component, OnInit} from '@angular/core';
import { Employee } from "../../employees/employee.interface";
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-block',
  templateUrl: './employee-block.component.html',
  styleUrls: ['./employee-block.component.css']
})

export class EmployeeBlockComponent implements OnInit {
  employee?: Employee;
  employees: Employee[] = [];
  // success = 'background-color: #FEEBE4;';
  success_circle = 'background-color: #4AC99B';

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
}
