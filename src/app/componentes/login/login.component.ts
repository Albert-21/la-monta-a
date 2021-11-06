import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";


@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:FirebaseService) { }

  ngOnInit(): void {
  }

  async iniciarSesion(usuario:string,contrasenia:string){
    try {
      await this.auth.iniciarSesion(usuario,contrasenia);
      console.log("logueo exitoso");
    }catch(error: any){
      console.log("ocurrio un error"+error);
    }
  }
}
