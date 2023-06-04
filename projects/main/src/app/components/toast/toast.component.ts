import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ToastData } from '../../interfaces/toast.interface';
import { takeUntil } from 'rxjs';
import { DestroyService } from '../../services/destroy.service';
import { animations } from '../../animations/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    animations['openClose']
  ]
})
export class ToastComponent implements OnInit {

  @ViewChild('progressBar', { static: false })
  protected progressBar!: ElementRef;
  protected progressInterval!: ReturnType<typeof setTimeout>;
  protected progressWidth!: string;

  constructor(
    @Inject(ToastService) public toastService: ToastService,
    @Inject(DestroyService) protected destroy$: DestroyService
    ) { }

  ngOnInit(): void {
    this.toastService.getState()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((data: ToastData) => {
        if (data.show) {
          this.progressWidth = '100%';
          this.countDown();
        }
      });
  }

  public countDown(): void {
    this.progressBar.nativeElement.style.width = this.progressWidth;

    this.progressInterval = setInterval(() => {
      const width: number = parseInt(this.progressBar.nativeElement.style.width, 10);

      if (width <= 0) {
        this.toastService.hide();
        clearInterval(this.progressInterval);

        return;
      }

      this.progressWidth = `${width - 1}%`;
      this.progressBar.nativeElement.style.width = this.progressWidth;
    }, 50);
  }

  public stopCountDown(): void {
    clearInterval(this.progressInterval);
  }
}
