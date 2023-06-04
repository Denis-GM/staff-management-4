import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import { EmployeeService } from "../../services/employee.service";
import { IEmployee } from "../../interfaces/employee.interface";
import {Employees} from "../../mock/mock-employees";
import { animations } from '../../animations/animations';

@Component({
  selector: 'app-adding-employees',
  templateUrl: './adding-employees.component.html',
  styleUrls: ['./adding-employees.component.css'],
  animations: [
    animations['slideIn']
  ]
})
export class AddingEmployeesComponent implements OnInit {
  private employee: IEmployee = {} as IEmployee;
  types:string[] = [
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
      'email': new FormControl('', [Validators.required]),

      'post': new FormControl(' '),
      'salary': new FormControl(' '),
      'project': new FormControl(' '),
      'city': new FormControl(' '),
      'date_interview': new FormControl(' '),
      'date_employment': new FormControl(' '),
      'date_output': new FormControl(' '),

      'education': new FormControl('УрФУ'),
      'educational_institution': new FormControl(' '),
      'specialization': new FormControl(' '),
      'year_graduation': new FormControl('2021'),
    });
  }

  constructor(private router: Router, private employeeService: EmployeeService) {
  }

  convertDate(date: string): string {
    // год, месяц, день
    const dateArr: string[] = date.split('-');
    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
  }

  setEmployee(form: FormGroup): void {
    if (form.valid) {
      this.employee = {
        id: Employees[Employees.length - 1].id++,
        firstName: form.get('firstName')?.value,
        lastName: form.get('lastName')?.value,
        patronymic: form.get('patronymic')?.value,
        birthday: this.convertDate(form.get('birthday')?.value),
        email: form.get('email')?.value,
        city: form.get('city')?.value,

        education: form.get('education')?.value,
        educational_institution: form.get('educational_institution')?.value,
        specialization: form.get('specialization')?.value,
        year_graduation: form.get('year_graduation')?.value,

        project: form.get('project')?.value,
        post: form.get('post')?.value,
        salary: Number(form.get('salary')?.value),
        status: 'Обычный',
      };
    }
  }

  redirectBack(){
    this.router.navigate(['dashboard/']);
  }

  submit(){
    this.setEmployee(this.employeeForm);
    this.employeeService.addEmployee(this.employee);
    this.redirectBack();
  }
}
