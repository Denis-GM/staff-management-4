import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';
 
@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
 
    constructor(private injector: Injector) { }
 
    handleError(error: Error) {
        const router = this.injector.get(Router);
        console.log('URL: ' + router.url);
        console.log('Произошла ошибка:', error.message);       
   }
}
 