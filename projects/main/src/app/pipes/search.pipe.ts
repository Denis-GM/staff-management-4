import { Pipe, PipeTransform} from "@angular/core";
import {Employee} from "../employees/employee.interface";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(Employees: Employee[], searchText: string): [] | Employee[] {
    if (!Employees){
      return [];
    }
    if (!searchText){
      return Employees;
    }
    searchText = searchText.toLocaleLowerCase();
    return Employees.filter(Employee =>{
      return (Employee.firstName + Employee.lastName + Employee.patronymic).toLocaleLowerCase().includes(searchText);
    });
  }
}
