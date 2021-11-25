import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import Swal from "sweetalert2";
import {format} from "fecha";

@Component({
  selector: 'comentariosComponent',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  date= new Date();
  totalVendido=0;
  cometarios:Array<any>

  constructor(private data_base:FirebaseService) {
    this.totalVentas()
    this.cometarios = []
    this.mostrarComentarios()

  }

  ngOnInit(): void {
    this.totalVentas()
    this.mostrarComentarios()

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

  mostrarComentarios(){
    this.data_base.mostrarComentarios().subscribe((comentariosSnapshot) => {
      this.cometarios = []
      comentariosSnapshot.forEach((comentarioData: any) => {
        this.cometarios.push({
          id: comentarioData.payload.doc.id,
          data: comentarioData.payload.doc.data()
        });
      });
    });
  }

eliminarComentario(id:string){
  Swal.fire({
    title: 'Estas seguro de hacerlo',
    icon: "warning",
    showConfirmButton: true,
    showCancelButton: true
  }).then(value => {
    if (value.isConfirmed){
      this.data_base.borrrComentario(id)
      Swal.fire({
        position: 'top-right',
        icon:"info",
        title: 'Se borro el comentario',
        showConfirmButton: false,
        timer: 1500
      })
    }else {
      Swal.fire({
        title: 'Se cancelo la operacion',
        icon:"info"
      })
    }
  })

}

eliminarTodo(){
    Swal.fire({
      title: 'Estas seguro de hacerlo',
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true
    }).then(value => {
      if (value.isConfirmed){
        this.data_base.borrarTodosComentarios()
      }else {
        Swal.fire({
          title: 'Se cancelo la operacion',
          icon:"info"
        })
      }
    })
}

}
