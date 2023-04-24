import { Component } from '@angular/core';
import { IEmployee } from "../../interfaces/employee.interface";
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from "rxjs";
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detailed-employee',
  templateUrl: './detailed-employee.component.html',
  styleUrls: ['./detailed-employee.component.css']
})
export class DetailedEmployeeComponent {
  public employee: IEmployee = {} as IEmployee;
  private routeSubscription: Subscription;
  // private querySubscription: Subscription;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {
    this.routeSubscription = route.params.subscribe(params => {
      this.employee = this.employeeService.getEmployee();
      // this.employee = this.employeeService.getEmployee(params['id']);
      console.log(this.employee);
    });
  }
}
