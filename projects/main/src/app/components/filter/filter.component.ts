import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, Observable, of, Subject} from "rxjs";
import {delay, startWith, switchMap} from 'rxjs/operators';
import {EmployeeService} from "../../services/employee.service";
import {FormControl} from "@angular/forms";
import {TuiKeySteps} from "@taiga-ui/kit";
import {IEmployee} from "../../interfaces/employee.interface";




@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],

})

export class FilterComponent implements OnInit{
  databaseMockData: IEmployee[] =[]
  result:string[] = []
  constructor(private employeeService: EmployeeService) { }
  @Output()
  public filterEvent$: EventEmitter<string[]> = new EventEmitter<string[]>()
  @Output()
  public filterRangeEvent$: EventEmitter<number[]|null> = new EventEmitter<number[]|null>()
  @Output()
  public paginationEvent$: EventEmitter<number> = new EventEmitter<number>()

  private readonly search$ = new Subject<string>();
  ngOnInit(): void {
    this.filterRangeEvent$.next(this.control.value)
    this.control.valueChanges.pipe(debounceTime(500))
      .subscribe(v=>this.filterRangeEvent$.next(v))
    this.pagination.setValue(5)
    this.pagination.valueChanges.pipe(debounceTime(500))
      .subscribe(v=>this.paginationEvent$.next(v))

    this.getEmployees();
    this.databaseMockData.forEach(Employee => {
      const proj = "Проект: "+Employee.project
      if (!this.result.includes(proj)){
        this.result.push(proj)
      }
      const post = "Должность: "+Employee.post
      if (!this.result.includes(post)){
        this.result.push(post)
      }
      const success ="Успешность: "+Employee.success
      if (!this.result.includes(success)){
        this.result.push(success)
      }
    })
    this.result.sort()
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.databaseMockData = employees
      });
  }
  value = [];


  readonly items$ = this.search$.pipe(
    switchMap(search =>
      this.serverRequest(search).pipe(startWith<string[] | null>(null)),
    ),
    startWith(this.result)
  );

  onSearchChange(search: string): void {
    this.search$.next(search);
  }

  private serverRequest(search: string): Observable<string[]> {
    let data = this.result
    data = data.filter(item =>
    {
      return item.toLowerCase().includes(search.toLocaleLowerCase())
    })
    return of(data).pipe(delay(Math.random()*1000+500));
    // return of(data);
  }
  readonly control = new FormControl([50_000, 1000_000]);
  readonly max = 1_000_000;
  readonly min = 10_000;
  readonly totalSteps = 100;
  readonly ticksLabels = ['0', '10K', '100K', '500k', '1000K'];
  readonly segments = this.ticksLabels.length - 1;

  readonly keySteps: TuiKeySteps = [
    // [percent, value]
    [0, this.min],
    [25, 50_000],
    [50, 100_000],
    [75, 500_000],
    [100, this.max],
  ];
  readonly currency = {
    other: '₽',
  };
  items = [
    5,10,15,20
  ];

  pagination = new FormControl();

}

