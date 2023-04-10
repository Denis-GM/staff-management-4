import { Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'monetary'
})
export class MonetaryPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let parts: string[] = value.toString().split( /(?=(?:...)*$)/ );
    return parts.join(' ') + ' руб';
  }
}
