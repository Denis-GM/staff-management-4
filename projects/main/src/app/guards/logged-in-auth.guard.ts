import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user: boolean = this.localStorageService.get('user') || false;
    if(user) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }

}
