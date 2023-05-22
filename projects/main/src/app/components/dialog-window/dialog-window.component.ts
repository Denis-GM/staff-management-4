import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IAction} from "../../mock/mock-actions";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent implements OnInit{
  readonly actions: string[] = [
    'Повышение',
    'Понижение',
    'Больничный',
    'Отпуск',
    'Собеседование',
    'Принятие на работу',
    'Первый рабочий день',
    // 'Изменение зарплаты',
  ];


  @Input() id_owner = 0;
  @Output() protected isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  actionControl = new FormControl(this.actions[0]);
  dateControl = new FormControl();

  protected formPost!: FormGroup;
  protected formDoubleDate!: FormGroup;

  constructor(private employeeService: EmployeeService, private changeDetection: ChangeDetectorRef) {}

  ngOnInit() {
    this.formPost = new FormGroup({
      newPost: new FormControl(),
      newSalary: new FormControl(),
    })

    this.formDoubleDate = new FormGroup({
      endDate: new FormControl(),
    })
  }

  protected closeDialog() {
    this.isOpen.emit(false);
  }

  convertDate(date: string): string {
    // год, месяц, день
    const dateArr = date.split('-');
    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
  }

  submit(){
    const actionName = this.actionControl.value!;
    const date = this.convertDate(this.dateControl.value);
    const action: IAction = {
      id_owner: this.id_owner,
      title: actionName,
      date: date,
      date2: null,
      newPost: null,
      newSalary: null,
    }

    if (actionName === 'Повышение' || actionName === 'Понижение' || actionName === 'Принятие на работу') {
      const newPost = this.formPost.get('newPost')?.value;
      const newSalary = this.formPost.get('newSalary')?.value;
      action.newPost = newPost;
      action.newSalary = newSalary;
      this.employeeService.editEmployees(this.id_owner, 'post', newPost);
      this.employeeService.editEmployees(this.id_owner, 'salary', newSalary);
    }
    else if (actionName === 'Больничный' || actionName === 'Отпуск') {
      action.date2 = this.convertDate(this.formDoubleDate.get('endDate')?.value);
    }
    // else if (actionName === 'Собеседование' || actionName === 'Первый рабочий день' || actionName === 'Увольнение') {
    //   this.employeeService.addAction(action);
    // }
    else if (this.actions.indexOf(actionName) === -1) {
      throw Error('missing action');
    }
    this.employeeService.addAction(action);
    console.log(action)
    this.applyChanges();
  }

  applyChanges() {
    this.closeDialog();
  }
}
