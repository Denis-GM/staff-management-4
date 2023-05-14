import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent implements OnInit{

  // enum PropertyType {
  //   House = 'House',
  //   Apartment = 'Apartment',
  //   Flat = 'Flat',
  //   Studio = 'Studio'
  // };

  readonly actions = [
    'Повышение',
    'Понижение',
    'Больничный',
    // 'Изменение зарплаты',
    'Отпуск',
    'Собеседование',
    'Принятие на работу',
    'Первый рабочий день',
  ];

  @Output() protected isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  actionControl = new FormControl(this.actions[0]);

  protected formPost!: FormGroup;

  ngOnInit() {
    // this.logForm = new FormGroup( {
    //   exampleControl: new FormControl(''),
    // })

    this.formPost = new FormGroup({
      date: new FormControl(),
      newPost: new FormControl(),
      newSalary: new FormControl(),
    })
  }

  public hideDialog() {
    this.isOpen.emit(false);
  }

  submitFormPost(){
    console.log(this.actionControl.value)
    console.log(this.formPost.getRawValue())
  }

}
