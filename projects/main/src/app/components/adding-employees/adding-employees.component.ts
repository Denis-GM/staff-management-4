import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import { EmployeeService } from "../../services/employee.service";
import { IEmployee } from "../../interfaces/employee.interface";
import { animations } from '../../animations/animations';
import {Observable} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-adding-employees',
  templateUrl: './adding-employees.component.html',
  styleUrls: ['./adding-employees.component.css'],
  animations: [
    animations['slideIn']
  ]
})
export class AddingEmployeesComponent implements OnInit {

  protected employeeForm!: FormGroup;

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      'lastName': new FormControl('', [Validators.required]),
      'firstName': new FormControl('', [Validators.required]),
      'patronymic': new FormControl('', [Validators.required]),
      'birthday': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),

      'post': new FormControl(''),
      'salary': new FormControl(''),
      'project': new FormControl(''),
      'city': new FormControl(''),

      'education': new FormControl('УрФУ'),
      'educational_institution': new FormControl(''),
      'specialization': new FormControl(''),
      'year_graduation': new FormControl('2021'),
    });
  }

  constructor(private router: Router, private employeeService: EmployeeService,
              @Inject(LocalStorageService) protected storageService: LocalStorageService) {  }

  private employees: IEmployee[] = this.storageService.get('employees');
  private employee: IEmployee = {} as IEmployee;
  types:string[] = [
    'Основное общее',
    'Среднее общее',
    'Специалитет',
    'Бакалавриат',
    'Магистратура',
  ];

  convertDate(date: string): string {
    // год, месяц, день
    const dateArr: string[] = date.split('-');
    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
  }

  setEmployee(form: FormGroup): void {
    console.log(this.employees);
    if (form.valid) {
      this.employee = {
        id: ++this.employees.length,
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
