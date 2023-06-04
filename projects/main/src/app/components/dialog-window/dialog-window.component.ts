import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {IAction} from "../../interfaces/action.interface";

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent implements OnInit{
  readonly actions: string[] = [
    'Повышение',
    'Понижение',
    'Увольнение',
    'Изменение статуса',
    'Больничный',
    'Отпуск',
    'Собеседование',
    'Принятие на работу',
    'Первый рабочий день',
  ];

  readonly statuses: string[] = [
    'Успешный',
    'Обычный',
    'Неуспешный',
  ];


  @Input() id_owner: number = 0;
  @Output() protected isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  actionControl: FormControl = new FormControl(this.actions[0]);
  dateControl: FormControl = new FormControl();

  protected formPost!: FormGroup;
  protected formStatus!: FormGroup;
  protected formDoubleDate!: FormGroup;

  constructor(private employeeService: EmployeeService, private changeDetection: ChangeDetectorRef) {}

  ngOnInit() {
    this.formPost = new FormGroup({
      newPost: new FormControl(),
      newSalary: new FormControl(),
    });

    this.formDoubleDate = new FormGroup({
      endDate: new FormControl(),
    });

    this.formStatus =new FormGroup({
      newStatus: new FormControl(),
    });
  }

  protected closeDialog() {
    this.isOpen.emit(false);
  }

  convertDate(date: string): string {
    // год, месяц, день
    const dateArr: string[] = date.split('-');
    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
  }

  submit(){
    const actionName: string = this.actionControl.value!;
    const date: string = this.convertDate(this.dateControl.value);
    const action: IAction = {
      id_owner: this.id_owner,
      title: actionName,
      date: date,
      date2: null,
      newPost: null,
      newSalary: null,
      newStatus: null,
      oldValue: null,
      newValue: null,
    };

    if (actionName === 'Повышение' || actionName === 'Понижение' || actionName === 'Принятие на работу') {
      const newPost: string = this.formPost.get('newPost')?.value;
      const newSalary: number = this.formPost.get('newSalary')?.value;
      action.newPost = newPost;
      action.newSalary = newSalary;
      this.employeeService.editEmployees(this.id_owner, 'post', newPost);
      this.employeeService.editEmployees(this.id_owner, 'salary', newSalary);
    }
    else if (actionName === 'Больничный' || actionName === 'Отпуск') {
      action.date2 = this.convertDate(this.formDoubleDate.get('endDate')?.value);
    }
    else if (actionName === 'Изменение статуса') {
      const newStatus: string = this.formStatus.get('newStatus')?.value;
      action.newStatus = newStatus;
      this.employeeService.editEmployees(this.id_owner, 'status', newStatus);
    }
    else if (actionName === 'Увольнение') {
      const status: string = 'Уволен';
      action.newStatus = status;
      this.employeeService.editEmployees(this.id_owner, 'status', status);
    }
    else if (this.actions.indexOf(actionName) === -1) {
      throw Error('missing action');
    }
    this.employeeService.addAction(action);
    console.log(action);
    this.applyChanges();
  }

  applyChanges() {
    this.closeDialog();
  }
}
