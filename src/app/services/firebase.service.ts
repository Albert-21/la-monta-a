import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: AngularFireAuth) {
    auth.authState.subscribe(usuario=>{
      console.log(usuario);
    })
  }



  iniciarSesion(usuario:string,contrasenia:string){
    return this.auth.signInWithEmailAndPassword(usuario,contrasenia);
  }

  cerrarSesion(){
    return this.auth.signOut();
  }
}
