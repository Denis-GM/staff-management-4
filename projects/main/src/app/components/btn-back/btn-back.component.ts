import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-btn-back',
  templateUrl: './btn-back.component.html',
  styleUrls: ['./btn-back.component.css']
})
export class BtnBackComponent {
  constructor(private router: Router,private location:Location) {
  }

  redirectBack(){
    this.location.back()
    // this.router.navigate(['dashboard/']);
  }
}
