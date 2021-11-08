import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import * as $ from 'jquery'
import {Producto} from "../../models/producto.model";
import {FirebaseService} from '../../services/firebase.service'
import {Observable} from "rxjs";
import {DocumentChangeAction} from "@angular/fire/compat/firestore";

@Component({
  selector: 'inventario-component',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  totalVendido=510;
  date= new Date();
   productos:Array<any>

    constructor(private data_base: FirebaseService) {
     this.productos = []
   }

  ngOnInit(): void {
    this.mostrarProductos()
  }

  private mostrarProductos(){
    this.data_base.mostrarPrductos().subscribe((productsSnapshot) => {
      this.productos = []
      productsSnapshot.forEach((productsData: any) => {
        this.productos.push({
          id: productsData.payload.doc.id,
          data: productsData.payload.doc.data()
        });
      });
    });
   }

  Guardar(){
Swal.fire({
      title: 'Producto',
      html:
        '<input id="IdProducto" type="number" placeholder="IdProducto" class="swal2-input">' +
        '<input id="Nombre" type="text" placeholder="Nombre" class="swal2-input">'+
        '<select id="selectTipo" placeholder="selecione" class="swal2-input">' +
        '  <option selected="selected"></option>\n' +
        '  <option>Del Comal</option>\n' +
        '  <option>Bebidas</option>\n' +
        '  <option>Comida del dia</option>\n'+
        '</select>' +
        '<input id="Precio" type="number" placeholder="Precio" class="swal2-input">'+
        '<input id="Piezas" type="number" placeholder="Piezas" class="swal2-input">',
      focusConfirm: false,
  showConfirmButton:true,
  showCancelButton:true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
      preConfirm: () => {
        const IdProducto = $('#IdProducto').val()
        const Nombre = $('#Nombre').val()
        const Tipo = $('#selectTipo').val()
        const Precio = $('#Precio').val()
        const Piezas = $('#Piezas').val()

        if (!IdProducto || !Nombre || !Tipo || !Precio || !Piezas) {
          Swal.showValidationMessage(`Ingrese los campos faltantes`)
        }
        return {
          IdProducto: IdProducto,
          Nombre: Nombre ,
          Tipo: Tipo,
          Precio: Precio,
          Piezas: Piezas
        }
      }
}).then((result) => {
      if (result.isConfirmed){
        this.data_base.guardarProducto(<Producto>{
          IdProducto: result.value?.IdProducto,
          Nombre: result.value?.Nombre,
          Tipo: result.value?.Tipo,
          Precio: result.value?.Precio,
          Piezas: result.value?.Piezas
        })
        Swal.fire('Guardado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('no se guardo', '', 'info')
      }
    })

  }

  editar(index:number,id:string){
    console.log(index)
    console.log(this.productos)
    Swal.fire({
      title: 'Editar Producto',
      html:
        '<input id="IdProducto" type="number" value="'+this.productos[index].data.IdProducto+'" placeholder="IdProducto" class="swal2-input">' +
        '<input id="Nombre" type="text" value="'+this.productos[index].data.Nombre+'" placeholder="Nombre" class="swal2-input">'+
        '<select id="selectTipo" placeholder="selecione" class="swal2-input">' +
        '  <option selected="selected">'+ this.productos[index].data.Tipo+'</option>\n' +
        '  <option>Del Comal</option>\n' +
        '  <option>Comida del dia</option>\n'+
        '</select>' +
        '<input id="Precio" type="number" value="'+this.productos[index].data.Precio+'" placeholder="Precio" class="swal2-input">'+
        '<input id="Piezas" type="number" value="'+this.productos[index].data.Piezas+'"placeholder="Piezas" class="swal2-input">',
      focusConfirm: false,
      showConfirmButton:true,
      showCancelButton:true,
      confirmButtonText: 'Editar',
      denyButtonText: `Cancelar`,
      preConfirm: () => {
        const IdProducto = $('#IdProducto').val()
        const Nombre = $('#Nombre').val()
        const Tipo = $('#selectTipo').val()
        const Precio = $('#Precio').val()
        const Piezas = $('#Piezas').val()

        if (!IdProducto || !Nombre || !Tipo || !Precio || !Piezas) {
          Swal.showValidationMessage(`Ingrese los campos faltantes`)
        }
        return {
          IdProducto: IdProducto,
          Nombre: Nombre ,
          Tipo: Tipo,
          Precio: Precio,
          Piezas: Piezas
        }
      }
    }).then((result) => {
      if (result.isConfirmed){
        console.log({
          IdProducto: result.value?.IdProducto,
          Nombre: result.value?.Nombre ,
          Tipo: result.value?.Tipo,
          Precio: result.value?.Precio,
          Piezas: result.value?.Piezas
        })

        this.data_base.actualizarProducto(id,{
          IdProducto: result.value?.IdProducto,
          Nombre: result.value?.Nombre ,
          Tipo: result.value?.Tipo,
          Precio: result.value?.Precio,
          Piezas: result.value?.Piezas
        })
        this.mostrarProductos()
        Swal.fire('Editado Corectamente!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('no se edito', '', 'info')
      }
    })
  }

eliminar(id:string){
  Swal.fire({
    title: '¿Estas seguro de eliminarlo?',
    text: "esto ya no es reversibe!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.data_base.borrarProducto(id)
      this.mostrarProductos()
      Swal.fire(
        'Borrado!',
        'Se borro Corectamente',
        'success'
      )
    }
  })
}
}









