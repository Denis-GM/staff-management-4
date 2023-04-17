import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../services/local-storage.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  registrationForm!: FormGroup;
  users: IUser[] = this.localStorageService.get('users') ?? [];

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private localStorageService: LocalStorageService
    ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      login: ['', [
        Validators.required,
        Validators.minLength(3),
        this.noSpaceAllowed
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        this.noSpaceAllowed
      ]]
    })
  }

  get login() {
    return this.registrationForm.get('login');
  }

  get password() {
    return this.registrationForm.get('password');
  }
  
  async submitHandler() {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      if (this.users.filter((user: IUser) => user.login === this.login?.value).length) {
        this.registrationForm.setErrors({ 'notUniqueUser': true })
        return;
      }
      this.users.push(this.registrationForm.value)
      this.localStorageService.save('users', this.users);
      
      this.localStorageService.save('loggedInStatus', true);
      this.router.navigate(['/dashboard'])
    }
  }

  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }
}
