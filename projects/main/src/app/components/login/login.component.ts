import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../services/local-storage.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-loginn',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginForm!: FormGroup;
  public users: IUser[] = this.localStorageService.get('users') ?? [];

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private localStorageService: LocalStorageService
    ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }
  
  async submitHandler() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const currentUser: IUser = this.loginForm.value;
      if (this.users.filter((user: IUser) => JSON.stringify(currentUser) === JSON.stringify(user)).length) {
        this.localStorageService.save('user', currentUser);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.loginForm.setErrors({ 'noSuchUser': true });
      }
    }
  }
}
