import {Component, Inject, OnInit } from '@angular/core';
import {IEmployee} from "../../interfaces/employee.interface";
import {Router} from "@angular/router";
import {FilterPipe} from "../../pipes/filter.pipe";
import { BehaviorSubject, Observable, map, takeUntil } from 'rxjs';
import { DestroyService } from '../../services/destroy.service';
import { animations } from '../../animations/animations';
import { EMPLOYEES_TOKEN, employeesFactory } from '../../tokens/employee.token';


@Component({
  selector: 'app-dismissed-employees',
  templateUrl: './dismissed-employees.component.html',
  styleUrls: ['./dismissed-employees.component.css'],
  animations: [
    animations['slideIn']
  ],
  providers: [
    {
      provide: EMPLOYEES_TOKEN,
      useFactory: employeesFactory
    }
  ]
})
export class DismissedEmployeesComponent implements OnInit {

  protected loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  protected employees: IEmployee[] = [];
  protected searchText: string = '';
  protected searchTags: string[] = [];
  protected rangeSalary: number[] | null = [];

  protected length: number = 1;
  protected index: number = 0;
  protected itemsPerPage: number = 5;

  constructor(
    @Inject(EMPLOYEES_TOKEN) protected employees$: Observable<IEmployee[]>,
    @Inject(DestroyService) protected destroy$: DestroyService,
    private router: Router,
    private filterPipe:FilterPipe
  ) { }

  ngOnInit(): void {
    this.employees$
      .pipe(
        map((employees: IEmployee[]) => {
          setTimeout(() => {
            this.loading$.next(false);
          }, 500);
          return employees;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((employeesList: IEmployee[]) => {
        this.employees = employeesList;
      });
  }

  applySearch(value:string):void{
    this.searchText = value;
    this.updatePaginationPages();
  }

  applyFilter(value:string[]):void{
    this.searchTags = value;
    this.updatePaginationPages();
  }

  selectEmployee(employee: IEmployee) {
    this.router.navigate(
      ['fired/employee/', employee.id],
    );
  }

  applyRangeFilter(value:number[]|null):void{
    this.rangeSalary = value;
    this.updatePaginationPages();
  }

  updatePaginationPages():void{
    const searchedItems: IEmployee[] = this.filterPipe.transform(this.employees, this.searchText,
      this.searchTags,this.rangeSalary);
    this.length = Math.ceil(searchedItems.length/this.itemsPerPage);
    this.index=0;
  }

  setItemsPerPage(value:number):void{
    this.itemsPerPage = value;
    this.updatePaginationPages();
  }

  goToPage(index: number): void {
    this.index = index;
  }
}
