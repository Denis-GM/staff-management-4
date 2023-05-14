import { Component, Input } from '@angular/core';
import { IEmployee } from '../../interfaces/employee.interface';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  @Input()
  public employee?: IEmployee;
}
