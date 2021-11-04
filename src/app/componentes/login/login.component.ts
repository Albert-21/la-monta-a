import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";


@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status = false;
  constructor(public auth: AngularFireAuth ) { }

  ngOnInit(): void {
  }



loginGoogle(){
  return new Promise((resolve, reject) => {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        result => resolve(result),
        error => reject(error)
      );
  });
}
}
