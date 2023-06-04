import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
 
@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
 
    constructor(private injector: Injector) { }
 
    handleError(error: Error) {
        const toast: ToastService = this.injector.get(ToastService);
        const router: Router = this.injector.get(Router);

        toast.show({
            title: 'Произошла ошибка',
            message: error.message
        });

        console.dirxml({
            name: error.name,
            url: router.url,
            message: error.message
        });
   }
}
 