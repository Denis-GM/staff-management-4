import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-btn-back',
  templateUrl: './btn-back.component.html',
  styleUrls: ['./btn-back.component.css']
})
export class BtnBackComponent {
  constructor(private router: Router) {
  }

  redirectBack(){
    this.router.navigate(['../']);
  }
}
