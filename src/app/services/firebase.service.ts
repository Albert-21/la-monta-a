import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Producto} from "../models/producto.model";


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private productsCollection: AngularFirestoreCollection<Producto>;
  private usuarioData: any

  constructor(private auth: AngularFireAuth, private angularFirestore: AngularFirestore) {
    this.productsCollection = angularFirestore.collection<Producto>('productos');

  }

  iniciarSesion(usuario: string, contrasenia: string) {
    return this.auth.signInWithEmailAndPassword(usuario, contrasenia);
  }

  cerrarSesion() {
    return this.auth.signOut();
  }

  isLogged() {
    this.auth.authState.subscribe(usuario => {
      let user = <string>usuario?.providerData[0]?.email
      localStorage.setItem('user', user)
    })
  }

  guardarProducto(producto: Producto) {
    this.productsCollection.add(producto)
  }

  mostrarPrductos() {
    return this.productsCollection.snapshotChanges()
  }

  actualizarProducto(documentId: string, producto: any) {
    return this.productsCollection.doc(documentId).set(producto);
  }

  borrarProducto(documentId: string) {
    return this.productsCollection.doc(documentId).delete();
  }
}
