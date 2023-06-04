import {Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {IEmployee} from "../../interfaces/employee.interface";
import {EMPLOYEES_TOKEN, EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";
import {FilterPipe} from "../../pipes/filter.pipe";
import { Observable, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-dismissed-employees',
  templateUrl: './dismissed-employees.component.html',
  styleUrls: ['./dismissed-employees.component.css']
})
export class DismissedEmployeesComponent implements OnInit, OnDestroy {

  protected employees: IEmployee[] = [];
  protected searchText: string = '';
  protected searchTags: string[] = [];
  protected rangeSalary: number[] | null = [];

  protected length: number = 1;
  protected index: number = 0;
  protected itemsPerPage: number = 5;

  private readonly _destroy$: Subject<void> = new Subject<void>();

  constructor(
    @Inject(EMPLOYEES_TOKEN) protected employees$: Observable<IEmployee[]>,
    private employeeService: EmployeeService,
    private router: Router,
    private filterPipe:FilterPipe
  ) { }

  ngOnInit(): void {
    this.employees$
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((employeesList: IEmployee[]) => {
        this.employees = employeesList;
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
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
    this.employeeService.setEmployee(employee);
    this.router.navigate(
      ['fired/employee/', employee.id],
      // { queryParams: { 'employee': JSON.stringify(employee) }}
    );
  }

  applyRangeFilter(value:number[]|null):void{
    this.rangeSalary = value;
    this.updatePaginationPages();
  }

  updatePaginationPages():void{
    const searchedItems = this.filterPipe.transform(this.employees, this.searchText,
      this.searchTags,this.rangeSalary);
    this.length = Math.ceil(searchedItems.length/this.itemsPerPage);
    console.log(this.length);
    this.index=0;
  }

  setItemsPerPage(value:number):void{
    this.itemsPerPage = value;
    this.updatePaginationPages();
  }

  goToPage(index: number): void {
    this.index = index;
    // console.info('New page:', index);
  }
}
