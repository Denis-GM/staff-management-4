import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appStatusEmployee]',
})
export class StatusEmployeeDirective implements OnInit{
  @Input('appStatusEmployee') statusEmployee = 'Успешный';
  @Input() isCircle = false;
  private class ='';

  constructor(private element: ElementRef, private renderer: Renderer2) {  }

  ngOnInit() {
    switch (this.statusEmployee){
      case 'Успешный':
        if (this.isCircle)
          this.class = 'success_circle';
        else
          this.class = 'success';
        break;
      case 'Неуспешный':
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
