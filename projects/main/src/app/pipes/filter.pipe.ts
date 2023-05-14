import { Pipe, PipeTransform } from '@angular/core';
import {ISearchTags} from "../interfaces/filter.interface";
import {IEmployee} from "../interfaces/employee.interface";

@Pipe({
  name: 'filterTags'
})
export class FilterPipe implements PipeTransform {

  transform(Employees: IEmployee[], searchText: string, searchTags: string[],range:number[]|null): [] | IEmployee[] {
    if (!Employees){
      return [];
    }
    let result:[]|IEmployee[] = Employees
    if (searchText){
      searchText = searchText.toLocaleLowerCase();
      result = result.filter(Employee =>{
        return `${Employee.lastName} ${Employee.firstName} ${Employee.patronymic}`.toLocaleLowerCase().includes(searchText);
      })
    }
    if (searchTags.length !== 0){
      searchTags = searchTags.map((tag) => tag.toLocaleLowerCase());
      const toFilter:ISearchTags = {
        projects: searchTags.filter(tag=>tag.includes("проект: ")).map(value => {
          if (value === undefined){
            return ""
          }
          return value.split(": ")[1]
        }),
        post: searchTags.filter(tag=>tag.includes("должность: ")).map(value => {
          if (value === undefined){
            return ""
          }
          return value.split(": ")[1]
        }),
        success: searchTags.filter(tag=>tag.includes("успешность: ")).map(value => {
          if (value === undefined){
            return ""
          }
          return value.split(": ")[1]
        })
      }
      if (toFilter.projects.length !==0){
        result = result.filter(Employee=>
          toFilter.projects.some(value => value === Employee.project.toLocaleLowerCase()))
      }
      if (toFilter.post.length !==0){
        result = result.filter(Employee=>
          toFilter.post.some(value => value === Employee.post.toLocaleLowerCase()))
      }
      if (toFilter.success.length !==0){
        result = result.filter(Employee=>
          toFilter.success.some(value => value === Employee.success.toLocaleLowerCase()))
      }
    }

    if (range !== null){
      result = result.filter(Employee => range[0] <= Employee.salary && Employee.salary <= range[1]
      )
    }
    // console.log(result)
    return result
  }
}
