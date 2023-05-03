import { Pipe, PipeTransform } from '@angular/core';
import {IEmployee} from "../interfaces/employee.interface";

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(Employees: IEmployee[], size:number, index:number): [] | IEmployee[] {
      return Employees.slice(index*size,(index+1)*size)
  }

}
