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

export class FilterComponent implements OnInit {

  protected databaseMockData: IEmployee[] =[]
  protected result: string[] = []
  protected value: string[] = [];
  
  protected readonly min_salary = 0;
  protected readonly max_salary = 1000000

  protected salaryControl: FormControl = new FormControl([this.min_salary, this.max_salary]);
  protected paginationControl: FormControl = new FormControl();

  protected readonly items: number[] = [5, 10, 15, 20];
  protected readonly totalSteps = 100;

  protected readonly keySteps: TuiKeySteps = [
    [0, this.min_salary],
    [25, 100_000],
    [50, 250_000],
    [75, 500_000],
    [100, this.max_salary],
  ];

  protected readonly currency = {
    other: 'руб',
  };

  private readonly search$: Subject<string> = new Subject<string>();

  constructor(private employeeService: EmployeeService) { }

  @Output()
  public filterEvent$: EventEmitter<string[]> = new EventEmitter<string[]>()

  @Output()
  public filterRangeEvent$: EventEmitter<number[]|null> = new EventEmitter<number[]|null>()

  @Output()
  public paginationEvent$: EventEmitter<number> = new EventEmitter<number>()

  ngOnInit(): void {
    this.getEmployees();

    const salary_list = this.databaseMockData.map((employee: IEmployee) => employee.salary);
    this.salaryControl = new FormControl([Math.min(...salary_list), Math.max(...salary_list)]);

    this.filterRangeEvent$.next(this.salaryControl.value)
    this.salaryControl.valueChanges.pipe(debounceTime(500))
      .subscribe(v=>this.filterRangeEvent$.next(v))
    this.paginationControl.setValue(5)
    this.paginationControl.valueChanges.pipe(debounceTime(500))
      .subscribe(v=>this.paginationEvent$.next(v))

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
  }
}

