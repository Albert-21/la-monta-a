import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FirebaseService} from "../../services/firebase.service";
import {Mesa} from "../../models/mesa.model";
import {Venta} from "../../models/venta.model";
import { format , setGlobalDateMasks} from 'fecha';
import * as $ from "jquery";


@Component({
  selector: 'ventas-component',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  totalVendido=510;
  piezas=0
  precio = 0
  subTotalMesa = 0;
  date= new Date();
  productos:Array<any>
  productosVenta:Array<any>
  idProducto:number = 0
  idMesa: string = ''
  mesa:Mesa = {
    id: '',
    producto:{
      id:'',
      data: {
        IdProducto: 0,
        Nombre: '',
        Tipo: '',
        Precio: 0,
        Piezas: 0,
      },
      subTotal:0
    }
  }
  NombreProducto:string = ''
  venta:Venta = {
    fecha:'',
    hora:'',
    idMesa:'',
    listaPrductos:[],
    totalVenta:0,
  }

  constructor(private data_base: FirebaseService) {
    this.productos = []
    this.productosVenta = []
    setGlobalDateMasks({
      fortatoFecha: 'DD/MM/YY',
      formatoHora: 'hh:mm:ss.SSS A',
    })
  }
  ngOnInit(): void {
    this.mostrarProductos()
  }

  public producto(){
      this.productos.forEach(value => {
        if(value.data.Nombre === this.NombreProducto){
          this.mesa = {
            id: this.idMesa,
            producto: value
          }
          this.mesa.producto.data.Piezas = this.piezas
          this.mesa.producto.subTotal = this.mesa.producto.data.Piezas * this.mesa.producto.data.Precio
        }
      })
  }

agregarProducto(){
     // @ts-ignore
  this.data_base.agregarPrductoMesa(this.idMesa,this.mesa).then(value => {
       Swal.fire('Se guardo correctamente','',"success")
     })
  this.idMesa = ''


}

realizarVenta(){
  Swal.fire({
    title: 'Seleccione la mesa',
    html:
      '<select id="selectTipo" placeholder="selecione" class="swal2-input">' +
      '  <option selected="selected"></option>' +
      '  <option>1</option>' +
      '  <option>2</option>' +
      '  <option>3</option>' +
      '  <option>4</option>' +
      '  <option>5</option>' +
      '  <option>6</option>' +
      '</select>',
    focusConfirm: false,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'realizar',
    denyButtonText: `Cancelar`,
    preConfirm: () => {
      const IdMesa = $('#selectTipo').val()
      return IdMesa
    }
  }).then((result) =>{
    if(result.isConfirmed){
      console.log(result.value)
      switch (result.value) {
        case '1':
          var totalVenta = 0
          this.data_base.mostrarProductosMesa1().subscribe((productsSnapshot) => {
            this.productosVenta = []
            productsSnapshot.forEach((productsData: any) => {
              this.productosVenta.push({
                id: productsData.payload.doc.id,
                data: productsData.payload.doc.data()
              });
            });
          });
          this.venta = {
            fecha: format(new Date(),'DD/MM/YY'),
            hora: format(new Date(),'hh:mm:ss A'),
            idMesa:result.value,
            listaPrductos:this.productosVenta,
            totalVenta:totalVenta,
          }
          console.log(this.productosVenta)
          this.venta.listaPrductos = this.productosVenta
          this.data_base.realizarVenta(this.venta).then(value => {
            Swal.fire('Se guardo correctamente la venta de la mesa 1','',"success")
          })
          break;
        case '2':
          this.data_base.realizarVenta(this.venta).then(value => {
            Swal.fire('Se guardo correctamente la venta de la mesa 2','',"success")
          })
          break;
        case '3':
          this.data_base.realizarVenta(this.venta).then(value => {
            Swal.fire('Se guardo correctamente la venta de la mesa 3','',"success")
          })
          break;
        case '4':
          this.data_base.realizarVenta(this.venta).then(value => {
            Swal.fire('Se guardo correctamente la venta de la mesa 4','',"success")
          })
          break;
        case '5':
          this.data_base.realizarVenta(this.venta).then(value => {
            Swal.fire('Se guardo correctamente la venta de la mesa 5','',"success")
          })
          break;
        case '6':
          this.data_base.realizarVenta(this.venta).then(value => {
            Swal.fire('Se guardo correctamente la venta de la mesa 6','',"success")
          })
          break;
      }
    }
  })

}

historialMesa(){

  switch (this.idMesa) {
    case '1':
      this.data_base.mostrarProductosMesa1().subscribe((productsSnapshot) => {
        this.productosVenta = []
        productsSnapshot.forEach((productsData: any) => {
          this.productosVenta.push({
            id: productsData.payload.doc.id,
            data: productsData.payload.doc.data()
          });
        });
      });
      console.log(this.productosVenta)
      break;
    case '2':
      this.data_base.mostrarProductosMesa2().subscribe((productsSnapshot) => {
        this.productosVenta = []
        productsSnapshot.forEach((productsData: any) => {
          this.productosVenta.push({
            id: productsData.payload.doc.id,
            data: productsData.payload.doc.data()
          });
        });
      });
      break;
    case '3':
      this.data_base.mostrarProductosMesa3().subscribe((productsSnapshot) => {
        this.productosVenta = []
        productsSnapshot.forEach((productsData: any) => {
          this.productosVenta.push({
            id: productsData.payload.doc.id,
            data: productsData.payload.doc.data()
          });
        });
      });
      break;
    case '4':
      this.data_base.mostrarProductosMesa4().subscribe((productsSnapshot) => {
        this.productosVenta = []
        productsSnapshot.forEach((productsData: any) => {
          this.productosVenta.push({
            id: productsData.payload.doc.id,
            data: productsData.payload.doc.data()
          });
        });
      });
      break;
    case '5':
      this.data_base.mostrarProductosMesa5().subscribe((productsSnapshot) => {
        this.productosVenta = []
        productsSnapshot.forEach((productsData: any) => {
          this.productosVenta.push({
            id: productsData.payload.doc.id,
            data: productsData.payload.doc.data()
          });
        });
      });
      break;
    case '6':
      this.data_base.mostrarProductosMesa6().subscribe((productsSnapshot) => {
        this.productosVenta = []
        productsSnapshot.forEach((productsData: any) => {
          this.productosVenta.push({
            id: productsData.payload.doc.id,
            data: productsData.payload.doc.data()
          });
        });
      });
      break;
  }


}

  private mostrarProductos() {
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

}
