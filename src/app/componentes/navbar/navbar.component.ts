import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";


@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth:FirebaseService) { }

  ngOnInit(): void {
  }

}
