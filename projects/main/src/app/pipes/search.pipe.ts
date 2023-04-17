import { Pipe, PipeTransform} from "@angular/core";
import {IEmployee} from "../interfaces/employee.interface";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(Employees: IEmployee[], searchText: string): [] | IEmployee[] {
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
