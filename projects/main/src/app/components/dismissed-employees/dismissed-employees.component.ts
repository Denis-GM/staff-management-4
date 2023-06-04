import {Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {IEmployee} from "../../interfaces/employee.interface";
import {EMPLOYEES_TOKEN, EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";
import {FilterPipe} from "../../pipes/filter.pipe";
import { Observable, Subject, takeUntil } from 'rxjs';
import { DestroyService } from '../../services/destroy.service';
import { animations } from '../../animations/animations';


@Component({
  selector: 'app-dismissed-employees',
  templateUrl: './dismissed-employees.component.html',
  styleUrls: ['./dismissed-employees.component.css'],
  animations: [
    animations['slideIn']
  ]
})
export class DismissedEmployeesComponent implements OnInit {

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
    private employeeService: EmployeeService,
    private router: Router,
    private filterPipe:FilterPipe
  ) { }

  ngOnInit(): void {
    this.employees$
      .pipe(
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
    const searchedItems: IEmployee[] = this.filterPipe.transform(this.employees, this.searchText,
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
