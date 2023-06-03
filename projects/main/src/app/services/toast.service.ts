import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastData } from '../interfaces/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public data!: ToastData;
  public toast$: Subject<ToastData> = new Subject<ToastData>();

  public show(data: ToastData): void {
    this.data = { ...data, show: true};
    this.toast$.next(this.data);
  }

  public hide(): void {
    this.data = { ...this.data, show: false };
    this.toast$.next(this.data);
  }

  public getState(): Subject<ToastData> {
    return this.toast$;
  }
}
