import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Producto} from "../models/producto.model";
import {Mesa} from "../models/mesa.model";
import {Venta} from "../models/venta.model";
import {Comentario} from "../models/comentario.model";


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private productsCollection: AngularFirestoreCollection<Producto>;
  private productosMesa1: AngularFirestoreCollection<Mesa>;
  private productosMesa2: AngularFirestoreCollection<Mesa>;
  private productosMesa3: AngularFirestoreCollection<Mesa>;
  private productosMesa4: AngularFirestoreCollection<Mesa>;
  private productosMesa5: AngularFirestoreCollection<Mesa>;
  private productosMesa6: AngularFirestoreCollection<Mesa>;
  private vetas: AngularFirestoreCollection<Venta>;
  private comentariosCollection: AngularFirestoreCollection<Comentario>
  public status = false
  public totalVendido:number = 0




  constructor(private auth: AngularFireAuth, private angularFirestore: AngularFirestore) {
    this.productsCollection = angularFirestore.collection<Producto>('productos');
    this.productosMesa1 = angularFirestore.collection<Mesa>('mesa1')
    this.productosMesa2 = angularFirestore.collection<Mesa>('mesa2')
    this.productosMesa3 = angularFirestore.collection<Mesa>('mesa3')
    this.productosMesa4 = angularFirestore.collection<Mesa>('mesa4')
    this.productosMesa5 = angularFirestore.collection<Mesa>('mesa5')
    this.productosMesa6 = angularFirestore.collection<Mesa>('mesa6')
    this.vetas = angularFirestore.collection<Venta>('ventas')
    this.comentariosCollection = angularFirestore.collection<Comentario>('comentarios')
  }

  iniciarSesion(usuario: string, contrasenia: string) {

    return this.auth.setPersistence('session').then(_ => {
      return this.auth.signInWithEmailAndPassword(usuario, contrasenia)
    });
  }

  cerrarSesion() {
    this.status = false
    return this.auth.signOut();

  }

  isLogged() {
    this.auth.authState.subscribe(usuario => {
      let user = <string>usuario?.providerData[0]?.email
     if(user != null){
       this.status = true
     }
    })
    return this.status
  }

  mostrarProductosMesa1(){
        return  this.productosMesa1.snapshotChanges()
  }
  mostrarProductosMesa2(){
    return  this.productosMesa2.snapshotChanges()
  }
  mostrarProductosMesa3(){
    return  this.productosMesa3.snapshotChanges()
  }
  mostrarProductosMesa4(){
    return  this.productosMesa4.snapshotChanges()
  }
  mostrarProductosMesa5(){
    return  this.productosMesa5.snapshotChanges()
  }
  mostrarProductosMesa6(){
    return  this.productosMesa6.snapshotChanges()
  }
  agregarPrductoMesa(idMesa:string,mesa:any){
    let respuesta
    switch (idMesa) {
      case '1':
        respuesta = this.productosMesa1.add(mesa)
        break;
      case '2':
        respuesta = this.productosMesa2.add(mesa)
        break;
      case '3':
        respuesta = this.productosMesa3.add(mesa)
        break;
      case '4':
        respuesta = this.productosMesa4.add(mesa)
        break;
      case '5':
        respuesta = this.productosMesa5.add(mesa)
        break;
      case '6':
        respuesta = this.productosMesa6.add(mesa)
        break;
    }
  return respuesta
  }

  realizarVenta(venta:any){
    return this.vetas.add(venta)
  }

  totalVentas() {
    this.totalVendido = 0
    this.vetas.snapshotChanges().subscribe( (ventasSnapshot) => {
      ventasSnapshot.forEach((ventasData:any) => {
          this.totalVendido +=  ventasData.payload.doc.data().totalVenta
      });
    });
  }


  borrarMesa(idMesa:string){
    switch (idMesa) {
      case '1':
        this.productosMesa1.get().subscribe(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });
        break;
      case '2':
        this.productosMesa2.get().subscribe(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });
        break;
      case '3':
        this.productosMesa3.get().subscribe(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });
        break;
      case '4':
        this.productosMesa4.get().subscribe(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });
        break;
      case '5':
        this.productosMesa5.get().subscribe(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });
        break;
      case '6':
        this.productosMesa6.get().subscribe(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });
        break;
    }
  }

  mostrarVentas(){
    return this.vetas.snapshotChanges()
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

  agregarComentario(comentario:Comentario){
    return this.comentariosCollection.add(comentario)
  }

  mostrarComentarios(){
    return this.comentariosCollection.snapshotChanges()
  }
  borrrComentario(id:string){
    this.comentariosCollection.doc(id).delete()
  }
  borrarTodosComentarios(){
    this.comentariosCollection.get().subscribe(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
  }
}
