import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../services/local-storage.service';
import { IUser } from '../../interfaces/user.interface';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: IUser = this.localStorageService.get('user');

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  logout(): void {
    this.localStorageService.remove('user');
    this.router.navigate(['/login']);
  }

}
