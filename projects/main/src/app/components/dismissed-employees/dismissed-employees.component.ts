import {Component, Inject, inject, InjectionToken, Injector} from '@angular/core';
import {IEmployee} from "../../interfaces/employee.interface";
import {EMPLOEES_TOKEN, EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";
import {FilterPipe} from "../../pipes/filter.pipe";


@Component({
  selector: 'app-dismissed-employees',
  templateUrl: './dismissed-employees.component.html',
  styleUrls: ['./dismissed-employees.component.css'],
  providers:[{provide:EMPLOEES_TOKEN,useFactory:(EmploeeS:EmployeeService):IEmployee[]=>{
    let res:IEmployee[]=[];
    EmploeeS.getEmployees().subscribe(el=>res=el.filter(value => value.success.includes("Уволен")));
    return res;
    },deps:[EmployeeService]}]
})
export class DismissedEmployeesComponent {
  employees:IEmployee[];
  searchText = "";
  searchTags: string[] = [];
  rangeSalary: number[] | null = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private filterPipe:FilterPipe,
    @Inject(EMPLOEES_TOKEN) emp:IEmployee[]
  ) {
    this.employees = emp;
  }

  ngOnInit(): void {
    console.log(this.employees);
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
      ['dashboard/employee/', employee.id],
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

  length = 1;

  index = 0;
  itemsPerPage = 5;
  goToPage(index: number): void {
    this.index = index;
    // console.info('New page:', index);
  }
}
