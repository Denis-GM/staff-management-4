import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output
} from '@angular/core';
import { IEmployee } from "../../interfaces/employee.interface";
import { EmployeeService } from '../../services/employee.service';
import {filter, Subscription} from "rxjs";
import { ActivatedRoute} from "@angular/router";
import {Employees} from "../../mock/mock-employees";
import {IAction, IActionEdit} from "../../mock/mock-actions";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-detailed-employee',
  templateUrl: './detailed-employee.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./detailed-employee.component.css']
})
export class DetailedEmployeeComponent implements OnInit{
  protected employee: IEmployee = {} as IEmployee;
  protected actions: any = [];
  public idEmployee = 0;
  public isOpen = false;
  protected editMode= false;
  editModeMain = false;
  editModeEducation = false;

  protected formMain!: FormGroup;
  protected formEducation!: FormGroup;
  private routeSubscription: Subscription;
  // private querySubscription: Subscription;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService,
              private changeDetection: ChangeDetectorRef) {
    this.routeSubscription = route.params.subscribe(params => {
      this.employee = this.employeeService.getEmployee();
      this.idEmployee = params['id'];
      console.log(this.employee);
      console.log(Employees);
    });
  }

  ngOnInit() {
    this.getActions();
    this.formMain = new FormGroup({
      newBirthday:  new FormControl(),
      newCity:  new FormControl(),
      newProject:  new FormControl(),
      newPost:  new FormControl(),
      newSalary:  new FormControl(),
    })

    this.formEducation = new FormGroup({
      newEducation:  new FormControl(),
      newEducational_institution:  new FormControl(),
      newSpecialization:  new FormControl(),
      newYear_graduation:  new FormControl(),
    })
  }

  getActions(): void {
    const id_owner = this.idEmployee;
    console.log(id_owner);
    this.actions = [];
    this.employeeService.getEmployeeActions(id_owner)
      .subscribe(action => {
        this.actions.push(action);
      });
  }

  public showDialog() {
    this.isOpen = true;
  }

  convertDate(date: string): string {
    // год, месяц, день
    const dateArr = date.split('-');
    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
  }

  protected manageDialog(isOpen: boolean) {
    // if (isOpen)
    this.isOpen = false;
    if (!isOpen){
      this.getActions();
      this.changeDetection.detectChanges()
    }
  }

  saveFormMain(): void {
    const form = this.formMain;
    const date = new Date();
    console.log(form);
    const action: IActionEdit = { id_owner: this.idEmployee, title: 'Изменение данных',
      date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`, oldValue: null, newValue: null,}
    console.log(action);

    const newBirthday = form.get('newBirthday')?.value;
    const newCity = form.get('newCity')?.value;
    const newProject = form.get('newProject')?.value;
    const newPost = form.get('newPost')?.value;
    const newSalary = form.get('newSalary')?.value;

    if(newBirthday !== null){
      action.oldValue = this.employee.birthday;
      action.newValue = newBirthday;
      console.log('newBirthday',action)
      this.employeeService.addAction(action);
      this.employeeService.editEmployees(this.idEmployee, 'birthday', newBirthday);
    }
    if(newCity !== null){
      action.oldValue = this.employee.city;
      action.newValue = newCity;
      console.log('newCity',action)
      this.employeeService.addAction(action);
      this.employeeService.editEmployees(this.idEmployee, 'city', newCity);
    }
    if(newProject !== null){
      action.oldValue = this.employee.project;
      action.newValue = newProject;
      console.log('newProject',action)
      this.employeeService.addAction(action);
      this.employeeService.editEmployees(this.idEmployee, 'project', newProject);
    }
    if(newPost !== null){
      action.oldValue = this.employee.post;
      action.newValue = newPost;
      console.log('newPost', action)
      this.employeeService.addAction(action);
      this.employeeService.editEmployees(this.idEmployee, 'post', newPost);
    }
    if(newSalary !== null){
      action.oldValue = this.employee.salary;
      action.newValue = newSalary;
      console.log('newSalary',action)
      this.employeeService.addAction(action);
      this.employeeService.editEmployees(this.idEmployee, 'salary', newSalary);
    }
    this.closeEditModeMain();
    this.getActions();
  }

  saveFormEducation(): void {
    console.log(this.formEducation.value);
    this.closeEditModeEducation();
  }

  openEditMode(): void {
    this.editMode = true;
    this.closeEditModeMain();
    this.closeEditModeEducation();
  }

  closeEditMode(): void {
    this.editMode = false;
    this.editModeMain = false;
    this.editModeEducation = false;
  }

  closeEditModeMain(): void {
    this.editModeMain = !this.editModeMain;
  }

  closeEditModeEducation(): void {
    this.editModeEducation = !this.editModeEducation;
  }
}
