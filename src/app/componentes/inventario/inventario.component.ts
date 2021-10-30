import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import * as $ from 'jquery'

@Component({
  selector: 'inventario-component',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  totalVendido=510;
  date= new Date();
   ProductoEdit ={
     IdProducto:  0,
    Nombre: '',
    Tipo: '',
    Precio: 0,
    Piezas: 0
  }

   productos:Array<any> = []
    idProducto:number = 0

  constructor() { }

  ngOnInit(): void {
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
        console.log({
          IdProducto: result.value?.IdProducto,
          Nombre: result.value?.Nombre ,
          Tipo: result.value?.Tipo,
          Precio: result.value?.Precio,
          Piezas: result.value?.Piezas
        })
        this.productos.push( {
          IdProducto: result.value?.IdProducto,
          Nombre: result.value?.Nombre ,
          Tipo: result.value?.Tipo,
          Precio: result.value?.Precio,
          Piezas: result.value?.Piezas
        });
        console.log(this.productos)
        Swal.fire('Guardado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('no se guardo', '', 'info')
      }
    })

  }

  async editar(){
    console.log(this.idProducto)
    console.log(this.productos[this.idProducto].Nombre)

 Swal.fire({
      title: 'Editar Producto',
      html:
        '<input id="IdProducto" type="number" value="'+this.productos[this.idProducto].IdProducto+'" placeholder="IdProducto" class="swal2-input">' +
        '<input id="Nombre" type="text" value="'+this.productos[this.idProducto].Nombre+'" placeholder="Nombre" class="swal2-input">'+
        '<select id="selectTipo" placeholder="selecione" class="swal2-input">' +
        '  <option selected="selected">'+ this.productos[this.idProducto].Tipo+'</option>\n' +
        '  <option>Del Comal</option>\n' +
        '  <option>Comida del dia</option>\n'+
        '</select>' +
        '<input id="Precio" type="number" value="'+this.productos[this.idProducto].Precio+'" placeholder="Precio" class="swal2-input">'+
        '<input id="Piezas" type="number" value="'+this.productos[this.idProducto].Piezas+'"placeholder="Piezas" class="swal2-input">',
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
          Swal.showValidationMessage(`Please enter login and password`)
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
     this.productos[this.idProducto] =
     {
       IdProducto: result.value?.IdProducto,
       Nombre: result.value?.Nombre ,
       Tipo: result.value?.Tipo,
       Precio: result.value?.Precio,
       Piezas: result.value?.Piezas
     }
     Swal.fire('Editado Corectamente!', '', 'success')
   } else if (result.isDenied) {
     Swal.fire('no se edito', '', 'info')
   }
 })



}
eliminar(){
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
      this.productos.splice(this.idProducto, 1);
      Swal.fire(
        'Borrad!',
        'Se borro Corectamente',
        'success'
      )
    }
  })
}
}









