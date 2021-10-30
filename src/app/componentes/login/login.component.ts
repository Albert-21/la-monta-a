import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status = false;
  constructor() { }

  ngOnInit(): void {
  }

}
