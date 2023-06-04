import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employees-skeleton',
  templateUrl: './employees-skeleton.component.html',
  styleUrls: ['./employees-skeleton.component.css']
})
export class EmployeesSkeletonComponent {

  @Input()
  public set repeat(repeatCount: number) {
    this.count = new Array(repeatCount);
  }

  protected count!: number[];
}
