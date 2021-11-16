import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {Router} from "@angular/router";


@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: FirebaseService, private router: Router) {
  }

  ngOnInit(): void {
  }

  async iniciarSesion(usuario: string, contrasenia: string) {
    try {
      await this.auth.iniciarSesion(usuario, contrasenia);
      console.log("logueo exitoso");
      this.auth.status = true
      await this.router.navigate(['inventario'])
    } catch (error: any) {
      console.log("ocurrio un error" + error);
    }
  }
}
