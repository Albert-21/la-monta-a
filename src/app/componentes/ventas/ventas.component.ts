import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import * as $ from "jquery";

@Component({
  selector: 'ventas-component',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  totalVendido=510;
  date= new Date();
  idMesa=1;
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
        '<button class="btn btn-primary" style="margin: 20px 0">Buscar producto</button>'+
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
      confirmButtonText: 'Realizar venta',
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
}
