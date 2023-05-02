import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import { EmployeeService } from "../../services/employee.service";
import { IEmployee } from "../../interfaces/employee.interface";
import {Employees} from "../../mock/mock-employees";

@Component({
  selector: 'app-adding-employees',
  templateUrl: './adding-employees.component.html',
  styleUrls: ['./adding-employees.component.css']
})
export class AddingEmployeesComponent implements OnInit {
  private employee: IEmployee = {} as IEmployee;
  types = [
    'Основное общее',
    'Среднее общее',
    'Специалитет',
    'Бакалавриат',
    'Магистратура',
  ];

  employeeForm!: FormGroup;

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      'lastName': new FormControl('', [Validators.required]),
      'firstName': new FormControl('', [Validators.required]),
      'patronymic': new FormControl('', [Validators.required]),
      'birthday': new FormControl('', [Validators.required]),
      'email': new FormControl('',
        // [Validators.required]
      ),

      'post': new FormControl('', [Validators.required]),
      'salary': new FormControl('', [Validators.required]),
      'project': new FormControl('', [Validators.required]),
      'city': new FormControl('',
        // [Validators.required]
      ),
      'date_interview': new FormControl(''),
      'date_employment': new FormControl(''),
      'date_output': new FormControl(''),

      'education': new FormControl('', [Validators.required]),
      'educational_institution': new FormControl('',
        // [Validators.required]
        ),
      'specialization': new FormControl('',
        // [Validators.required]
      ),
      'year_graduation': new FormControl('',
        // [Validators.required]
      ),
    });
  }

  constructor(private router: Router, private employeeService: EmployeeService) {
  }

  setEmployee(form: FormGroup): void {
    if (form.valid) {
      this.employee = {
        id: Employees[Employees.length - 1].id++,
        firstName: form.get('firstName')?.value,
        lastName: form.get('lastName')?.value,
        patronymic: form.get('patronymic')?.value,
        birthday: form.get('birthday')?.value,
        education: form.get('education')?.value,
        project: form.get('project')?.value,
        post: form.get('post')?.value,
        salary: Number(form.get('salary')?.value),
        success: 'Обычный',
      }
    }
  }

  redirectBack(){
    this.router.navigate(['dashboard/']);
  }

  submit(){
    this.setEmployee(this.employeeForm);
    this.employeeService.addEmployee(this.employee);
    console.log(this.employeeForm);
    this.redirectBack();
  }
}
