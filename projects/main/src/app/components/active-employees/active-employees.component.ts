import { Component, OnInit } from '@angular/core';
import { IEmployee } from "../../interfaces/employee.interface";
import { EmployeeService } from '../../services/employee.service';
import { Router } from "@angular/router";
import { FilterPipe } from "../../pipes/filter.pipe";

@Component({
  selector: 'app-active-employees',
  templateUrl: './active-employees.component.html',
  styleUrls: ['./active-employees.component.css']
})

export class ActiveEmployeesComponent implements OnInit {
  
  protected employees: IEmployee[] = [];
  protected searchText = "";
  protected searchTags: string[] = [];
  protected rangeSalary: number[] | null = [];

  protected length: number = 1;
  protected index: number = 0;
  protected itemsPerPage: number = 5;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private filterPipe: FilterPipe
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.employees = employees.filter(employee => !employee.success.includes("Уволен"));
      });
  }

  applySearch(value: string): void {
    this.searchText = value;
    this.updatePaginationPages();
  }

  applyFilter(value: string[]): void {
    this.searchTags = value;
    this.updatePaginationPages();
  }

  selectEmployee(employee: IEmployee) {
    this.employeeService.setEmployee(employee);
    this.router.navigate(['dashboard/employee/', employee.id]);
  }

  applyRangeFilter(value: number[] | null): void {
    this.rangeSalary = value;
    this.updatePaginationPages();
  }

  updatePaginationPages(): void {
    const searchedItems = this.filterPipe.transform(this.employees, this.searchText,
      this.searchTags, this.rangeSalary);
    this.length = Math.ceil(searchedItems.length / this.itemsPerPage);
    this.index = 0;
  }

  setItemsPerPage(value: number): void {
    this.itemsPerPage = value;
    this.updatePaginationPages();
  }

  goToPage(index: number): void {
    this.index = index;
  }
}
