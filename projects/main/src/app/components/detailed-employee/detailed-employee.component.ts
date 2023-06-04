import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { IEmployee } from "../../interfaces/employee.interface";
import { EmployeeService } from '../../services/employee.service';
import {Subscription} from "rxjs";
import { ActivatedRoute} from "@angular/router";
import {Employees} from "../../mock/mock-employees";
import {IActionEdit} from "../../mock/mock-actions";
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
  public idEmployee:number = 0;
  public isOpen:boolean = false;
  protected editMode:boolean = false;
  editModeMain:boolean = false;
  editModeEducation:boolean = false;

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
    });

    this.formEducation = new FormGroup({
      newEducation:  new FormControl(),
      newEducational_institution:  new FormControl(),
      newSpecialization:  new FormControl(),
      newYear_graduation:  new FormControl(),
    });
  }

  getActions(): void {
    const id_owner:number = this.idEmployee;
    console.log(id_owner);
    this.actions = [];
    this.employeeService.getEmployeeActions(id_owner)
      .subscribe((action:object) => {
        this.actions.push(action);
      });
  }

  public showDialog() {
    this.isOpen = true;
  }

  convertDate(date: string): string {
    // год, месяц, день
    const dateArr:string[] = date.split('-');
    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
  }

  protected manageDialog(isOpen: boolean) {
    // if (isOpen)
    this.isOpen = false;
    if (!isOpen){
      this.getActions();
      this.changeDetection.detectChanges();
    }
  }

  changeEmployee(nameEditField: string, oldValue: number | string, newValue: number | string,): void {
    const date:Date = new Date();
    const action: IActionEdit = { id_owner: this.idEmployee, title: 'Изменение данных',
      date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`, oldValue: null, newValue: null,};
    action.oldValue = oldValue;
    action.newValue = newValue;
    this.employeeService.addAction(action);
    this.employeeService.editEmployees(this.idEmployee, nameEditField, action.newValue);
  }

  saveFormMain(): void {
    const form:FormGroup = this.formMain;
    const newBirthday = form.get('newBirthday')?.value;
    const newCity = form.get('newCity')?.value;
    const newProject = form.get('newProject')?.value;
    const newPost = form.get('newPost')?.value;
    const newSalary = form.get('newSalary')?.value;

    if(newBirthday !== null){
      this.changeEmployee('birthday', this.employee.birthday, newBirthday);
    }
    if(newCity !== null){
      this.changeEmployee('city', this.employee.city, newCity);
    }
    if(newProject !== null){
      this.changeEmployee('project', this.employee.project, newProject);
    }
    if(newPost !== null){
      this.changeEmployee('post', this.employee.post, newPost);
    }
    if(newSalary !== null){
      this.changeEmployee('salary', this.employee.salary, newSalary);
    }
    this.closeEditModeMain();
    this.getActions();
  }

  saveFormEducation(): void {
    const form = this.formEducation;
    const newEducation = form.get('newEducation')?.value;
    const newEducational_institution = form.get('newEducational_institution')?.value;
    const newSpecialization = form.get('newSpecialization')?.value;
    const newYear_graduation = form.get('newYear_graduation')?.value;

    if(newEducation !== null){
      this.changeEmployee('education', this.employee.education, newEducation);
    }
    if(newEducational_institution !== null){
      this.changeEmployee('educational_institution', this.employee.educational_institution, newEducational_institution);
    }
    if(newSpecialization !== null){
      this.changeEmployee('specialization', this.employee.specialization, newSpecialization);
    }
    if(newYear_graduation !== null){
      this.changeEmployee('year_graduation', this.employee.year_graduation, newYear_graduation);
    }
    this.closeEditModeEducation();
    this.getActions();
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
