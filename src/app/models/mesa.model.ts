export interface Mesa {
  id: string;
  producto:{
  id:'',
  data: {
    IdProducto: number,
    Nombre: string,
    Tipo: string,
    Precio: number,
    Piezas: number,
  }
  subTotal:number
}
}
