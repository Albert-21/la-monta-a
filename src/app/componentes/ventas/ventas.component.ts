import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FirebaseService} from "../../services/firebase.service";
import {Mesa} from "../../models/mesa.model";
import {Venta} from "../../models/venta.model";
import { format } from 'fecha';



@Component({
  selector: 'ventas-component',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  totalVendido=0;
  piezas=0
  precio = 0
  ventas:Array<any>;
  date= new Date();
  productos:Array<any>
  productosInventario:Array<any>
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
    this.productosInventario = []
    this.productosVenta = []
    this.ventas = []
    this.mostrarVentas('TODAS')
    this.totalVentas()
    this.productosDeInventario()
  }
  ngOnInit(): void {
    this.mostrarProductos()
    this.totalVentas()
    this.productosDeInventario()
  }
   private totalVentas() {
     this.data_base.mostrarVentas().subscribe( (ventasSnapshot) => {
       this.totalVendido = 0
       var fecha = format(new Date(),'DD/MM/YY')
       ventasSnapshot.forEach((ventasData:any) => {
         if (ventasData.payload.doc.data().fecha === fecha)
          this.totalVendido += ventasData.payload.doc.data().totalVenta
         });
     });
  }

  private productosDeInventario(){
    this.data_base.mostrarPrductos().subscribe((productsSnapshot) => {
      this.productosInventario = []
      productsSnapshot.forEach((productsData: any) => {
        this.productosInventario.push({
          id: productsData.payload.doc.id,
          data: productsData.payload.doc.data()
        });
      });
    });
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

agregarProducto(idmesa:string,productoId:string, productoid:string,nombreproducto:string, tipoproducto:string, precioProducto:string, CantPiezas:string){
  let alerta = false
  this.productosInventario.forEach(value => {
    if (value.data.IdProducto === productoid ){
      if(parseInt(CantPiezas) > 0 ){
        if(parseInt(CantPiezas) > value.data.Piezas){
          Swal.fire({icon: "warning", titleText: 'Upss!', text:'no hay producto suficiente solo hay en existencia '+ value.data.Piezas})
        }else {
          alerta = true
        }
      }else {
        Swal.fire({icon: "error", titleText: 'Error!', text:'Ingrese una cantidad positiva'})

      }

    }
  });
  if (alerta){
    // @ts-ignore
    this.data_base.agregarPrductoMesa(idmesa,{
      id: idmesa,
      producto:{
        id:productoId,
        data: {
          IdProducto: productoid,
          Nombre: nombreproducto,
          Tipo: tipoproducto,
          Precio: parseInt(precioProducto),
          Piezas: parseInt(CantPiezas),
        },
        subTotal:parseInt(precioProducto) * parseInt(CantPiezas)
      }
    }).then(value => {
      Swal.fire('Se guardo correctamente','',"success")
    })
    this.idMesa = ''

  }

}


realizarVenta(idMesa:string){
    if(idMesa != 'Ingresa el ID de la mesa para consultar las productos de la mesa'){
      this.productosDeInventario()
      Swal.fire({
        title: 'Cobrar de la mesa: '+idMesa,
        html:'',
        focusConfirm: false,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'realizar',
        denyButtonText: `Cancelar`
      }).then((result) =>{
        if(result.isConfirmed){
          console.log(idMesa)
          switch (idMesa) {
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

              this.venta.listaPrductos = this.productosVenta
              if(this.venta.listaPrductos.length > 0){
                this.venta.listaPrductos.forEach(value => {
                  totalVenta += value.data.producto.subTotal
                })
                this.venta = {
                  fecha: format(new Date(),'DD/MM/YY'),
                  hora: format(new Date(),'hh:mm:ss A'),
                  idMesa:idMesa,
                  listaPrductos:this.productosVenta,
                  totalVenta:totalVenta,
                }

                this.data_base.realizarVenta(this.venta).then(value => {
                  Swal.fire('Se guardo correctamente la venta de la mesa 1','',"success")
                  this.venta.listaPrductos.forEach(value => {
                    this.productosInventario.forEach( value1 => {
                      if(value.data.producto.id === value1.id){
                        let temp = parseInt(value1.data.Piezas) - parseInt(value.data.producto.data.Piezas)
                        value1.data.Piezas = temp
                        this.data_base.actualizarProducto(value1.id,value1.data)
                      }
                    })
                  })
                  this.data_base.borrarMesa(idMesa)
                })

              }

              break;
            case '2':
              var totalVenta = 0
              this.data_base.mostrarProductosMesa2().subscribe((productsSnapshot) => {
                this.productosVenta = []
                productsSnapshot.forEach((productsData: any) => {
                  this.productosVenta.push({
                    id: productsData.payload.doc.id,
                    data: productsData.payload.doc.data()
                  });
                });
              });

              this.venta.listaPrductos = this.productosVenta
              if(this.venta.listaPrductos.length > 0){
                this.venta.listaPrductos.forEach(value => {
                  totalVenta += value.data.producto.subTotal
                })

                this.venta = {
                  fecha: format(new Date(),'DD/MM/YY'),
                  hora: format(new Date(),'hh:mm:ss A'),
                  idMesa:idMesa,
                  listaPrductos:this.productosVenta,
                  totalVenta:totalVenta,
                }
                this.data_base.realizarVenta(this.venta).then(value => {
                  Swal.fire('Se guardo correctamente la venta de la mesa 2','',"success")
                  this.venta.listaPrductos.forEach(value => {
                    this.productosInventario.forEach( value1 => {
                      if(value.data.producto.id === value1.id){
                        let temp = parseInt(value1.data.Piezas) - parseInt(value.data.producto.data.Piezas)
                        value1.data.Piezas = temp
                        this.data_base.actualizarProducto(value1.id,value1.data)
                      }
                    })
                  })
                  this.data_base.borrarMesa(idMesa)
                })

              }
              break;
            case '3':
              var totalVenta = 0
              this.data_base.mostrarProductosMesa3().subscribe((productsSnapshot) => {
                this.productosVenta = []
                productsSnapshot.forEach((productsData: any) => {
                  this.productosVenta.push({
                    id: productsData.payload.doc.id,
                    data: productsData.payload.doc.data()
                  });
                });
              });

              this.venta.listaPrductos = this.productosVenta
              if(this.venta.listaPrductos.length > 0){
                this.venta.listaPrductos.forEach(value => {
                  totalVenta += value.data.producto.subTotal
                })

                this.venta = {
                  fecha: format(new Date(),'DD/MM/YY'),
                  hora: format(new Date(),'hh:mm:ss A'),
                  idMesa:idMesa,
                  listaPrductos:this.productosVenta,
                  totalVenta:totalVenta,
                }
                this.data_base.realizarVenta(this.venta).then(value => {
                  Swal.fire('Se guardo correctamente la venta de la mesa 3','',"success")
                  this.venta.listaPrductos.forEach(value => {
                    this.productosInventario.forEach( value1 => {
                      if(value.data.producto.id === value1.id){
                        let temp = parseInt(value1.data.Piezas) - parseInt(value.data.producto.data.Piezas)
                        value1.data.Piezas = temp
                        this.data_base.actualizarProducto(value1.id,value1.data)
                      }
                    })
                  })
                  this.data_base.borrarMesa(idMesa)
                })

              }
              break;
            case '4':
              var totalVenta = 0
              this.data_base.mostrarProductosMesa4().subscribe((productsSnapshot) => {
                this.productosVenta = []
                productsSnapshot.forEach((productsData: any) => {
                  this.productosVenta.push({
                    id: productsData.payload.doc.id,
                    data: productsData.payload.doc.data()
                  });
                });
              });

              this.venta.listaPrductos = this.productosVenta
              if(this.venta.listaPrductos.length > 0){
                this.venta.listaPrductos.forEach(value => {
                  totalVenta += value.data.producto.subTotal
                })

                this.venta = {
                  fecha: format(new Date(),'DD/MM/YY'),
                  hora: format(new Date(),'hh:mm:ss A'),
                  idMesa:idMesa,
                  listaPrductos:this.productosVenta,
                  totalVenta:totalVenta,
                }
                this.data_base.realizarVenta(this.venta).then(value => {
                  Swal.fire('Se guardo correctamente la venta de la mesa 4','',"success")
                  this.venta.listaPrductos.forEach(value => {
                    this.productosInventario.forEach( value1 => {
                      if(value.data.producto.id === value1.id){
                        let temp = parseInt(value1.data.Piezas) - parseInt(value.data.producto.data.Piezas)
                        value1.data.Piezas = temp
                        this.data_base.actualizarProducto(value1.id,value1.data)
                      }
                    })
                  })
                  this.data_base.borrarMesa(idMesa)
                })

              }
              break;
            case '5':
              var totalVenta = 0
              this.data_base.mostrarProductosMesa5().subscribe((productsSnapshot) => {
                this.productosVenta = []
                productsSnapshot.forEach((productsData: any) => {
                  this.productosVenta.push({
                    id: productsData.payload.doc.id,
                    data: productsData.payload.doc.data()
                  });
                });
              });

              this.venta.listaPrductos = this.productosVenta
              if(this.venta.listaPrductos.length > 0){
                this.venta.listaPrductos.forEach(value => {
                  totalVenta += value.data.producto.subTotal
                })

                this.venta = {
                  fecha: format(new Date(),'DD/MM/YY'),
                  hora: format(new Date(),'hh:mm:ss A'),
                  idMesa:idMesa,
                  listaPrductos:this.productosVenta,
                  totalVenta:totalVenta,
                }
                this.data_base.realizarVenta(this.venta).then(value => {
                  Swal.fire('Se guardo correctamente la venta de la mesa 5','',"success")
                  this.venta.listaPrductos.forEach(value => {
                    this.productosInventario.forEach( value1 => {
                      if(value.data.producto.id === value1.id){
                        let temp = parseInt(value1.data.Piezas) - parseInt(value.data.producto.data.Piezas)
                        value1.data.Piezas = temp
                        this.data_base.actualizarProducto(value1.id,value1.data)
                      }
                    })
                  })
                  this.data_base.borrarMesa(idMesa)
                })

              }
              break;
            case '6':
              var totalVenta = 0
              this.data_base.mostrarProductosMesa6().subscribe((productsSnapshot) => {
                this.productosVenta = []
                productsSnapshot.forEach((productsData: any) => {
                  this.productosVenta.push({
                    id: productsData.payload.doc.id,
                    data: productsData.payload.doc.data()
                  });
                });
              });

              this.venta.listaPrductos = this.productosVenta
              if(this.venta.listaPrductos.length > 0){
                this.venta.listaPrductos.forEach(value => {
                  totalVenta += value.data.producto.subTotal
                })

                this.venta = {
                  fecha: format(new Date(),'DD/MM/YY'),
                  hora: format(new Date(),'hh:mm:ss A'),
                  idMesa:idMesa,
                  listaPrductos:this.productosVenta,
                  totalVenta:totalVenta,
                }
                this.data_base.realizarVenta(this.venta).then(value => {
                  Swal.fire('Se guardo correctamente la venta de la mesa 6','',"success")
                  this.venta.listaPrductos.forEach(value => {
                    this.productosInventario.forEach( value1 => {
                      if(value.data.producto.id === value1.id){
                        let temp = parseInt(value1.data.Piezas) - parseInt(value.data.producto.data.Piezas)
                        value1.data.Piezas = temp
                        this.data_base.actualizarProducto(value1.id,value1.data)
                      }
                    })
                  })
                  this.data_base.borrarMesa(idMesa)
                })

              }
              break;
          }
        }
      })
    }


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
mostrarVentas(idMESA:any){
    switch (idMESA) {
      case 'TODAS':
        this.data_base.mostrarVentas().subscribe( (ventasSnapshot) => {
          this.ventas = []
          ventasSnapshot.forEach((ventasData:any) => {
            this.ventas.push({
              id: ventasData.payload.doc.id,
              data: ventasData.payload.doc.data(),
            });
          });
        });
        break;
      case '1':
        this.data_base.mostrarVentas().subscribe( (ventasSnapshot) => {
          this.ventas = []
          ventasSnapshot.forEach((ventasData:any) => {
            this.ventas.push({
              id: ventasData.payload.doc.id,
              data: ventasData.payload.doc.data(),
            });
          });

          let temp:Array<any> = []
          this.ventas.forEach( value => {
            if(value.data.idMesa === '1' ){
              temp.push(value)
            }
          })

          this.ventas = temp
        });
        break;
      case '2':
        this.data_base.mostrarVentas().subscribe( (ventasSnapshot) => {
          this.ventas = []
          ventasSnapshot.forEach((ventasData:any) => {
            this.ventas.push({
              id: ventasData.payload.doc.id,
              data: ventasData.payload.doc.data(),
            });
          });

          let temp:Array<any> = []
          this.ventas.forEach( value => {
            if(value.data.idMesa === '2' ){
              temp.push(value)
            }
          })

          this.ventas = temp
        });
        break;
      case '3':
        this.data_base.mostrarVentas().subscribe( (ventasSnapshot) => {
          this.ventas = []
          ventasSnapshot.forEach((ventasData:any) => {
            this.ventas.push({
              id: ventasData.payload.doc.id,
              data: ventasData.payload.doc.data(),
            });
          });

          let temp:Array<any> = []
          this.ventas.forEach( value => {
            if(value.data.idMesa === '3' ){
              temp.push(value)
            }
          })

          this.ventas = temp
        });
        break;
      case '4':
        this.data_base.mostrarVentas().subscribe( (ventasSnapshot) => {
          this.ventas = []
          ventasSnapshot.forEach((ventasData:any) => {
            this.ventas.push({
              id: ventasData.payload.doc.id,
              data: ventasData.payload.doc.data(),
            });
          });

          let temp:Array<any> = []
          this.ventas.forEach( value => {
            if(value.data.idMesa === '4' ){
              temp.push(value)
            }
          })

          this.ventas = temp
        });
        break;

      case '5':
        this.data_base.mostrarVentas().subscribe( (ventasSnapshot) => {
          this.ventas = []
          ventasSnapshot.forEach((ventasData:any) => {
            this.ventas.push({
              id: ventasData.payload.doc.id,
              data: ventasData.payload.doc.data(),
            });
          });

          let temp:Array<any> = []
          this.ventas.forEach( value => {
            if(value.data.idMesa === '5' ){
              temp.push(value)
            }
          })

          this.ventas = temp
        });
        break;

      case '6':
        this.data_base.mostrarVentas().subscribe( (ventasSnapshot) => {
          this.ventas = []
          ventasSnapshot.forEach((ventasData:any) => {
            this.ventas.push({
              id: ventasData.payload.doc.id,
              data: ventasData.payload.doc.data(),
            });
          });

          let temp:Array<any> = []
          this.ventas.forEach( value => {
            if(value.data.idMesa === '6' ){
              temp.push(value)
            }
          })

          this.ventas = temp
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

  eliminarProductoHistorial(IdMesa:string,id:string){
    this.data_base.borrarProductoMesa(IdMesa,id)
  }

}
