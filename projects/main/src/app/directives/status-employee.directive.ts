import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appStatusEmployee]',
})
export class StatusEmployeeDirective implements OnChanges{
  @Input('appStatusEmployee') statusEmployee: string = 'Успешный';
  @Input() isCircle: boolean = false;
  private class: string ='';

  constructor(private element: ElementRef, private renderer: Renderer2) {  }

  ngOnChanges(changes: SimpleChanges){
    this.assignStatus();
  }

  assignStatus(): void {
    switch (this.statusEmployee){
      case 'Успешный':
        if (this.isCircle)
          this.class = 'success_circle';
        else
          this.class = 'success';
        break;
      case 'Неуспешный':
      case 'Уволен':
        if (this.isCircle)
          this.class = 'unsuccess_circle';
        else
          this.class = 'unsuccess';
        break;
      case 'Обычный':
        if (this.isCircle)
          this.class = 'ordinary_circle';
        else
          this.class = 'ordinary';
        break;
    }
    this.renderer.addClass(this.element.nativeElement, this.class);
  }
}
