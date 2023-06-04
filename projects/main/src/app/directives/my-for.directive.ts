import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {IEmployee} from "../interfaces/employee.interface";

@Directive({
  selector: '[myFor][myForOf]'
})
export class MyForDirective {

  @Input()
  set myForOf(collection:IEmployee[]) {
    this.viewContainer.clear();
    collection.forEach((employee: IEmployee, index: number) => {
      this.viewContainer.createEmbeddedView(
        this.templateRef,
        {$implicit: employee},
        index
      );
    });
  }
  constructor(private templateRef:TemplateRef<{$implicit: IEmployee}>,
              private viewContainer:ViewContainerRef) { }
}
