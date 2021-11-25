import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import Swal from "sweetalert2";
import {format} from "fecha";
import {Router} from "@angular/router";

@Component({
  selector: 'cuentanos-tu-experiencia-component',
  templateUrl: './cuentanos-tu-experiencia.component.html',
  styleUrls: ['./cuentanos-tu-experiencia.component.css']
})
export class CuentanosTuExperienciaComponent implements OnInit {
 cometarios:Array<any> = []

  datos = {
    fecha:'',
    hora: '',
    nombreCompleto:'',
    ciudad: '',
    pais:'',
    comentario:''
  }

  constructor(private data_base:FirebaseService) {
    this.mostrarComentarios()
  }

  ngOnInit(): void {
   this.mostrarComentarios()
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
  guardarComentario(nombre:string,ciudad:string,pais:string,comentario:string){
    this.data_base.agregarComentario({
                                                fecha: format(new Date(),'DD/MM/YY'),
                                                hora: format(new Date(),'hh:mm:ss A'),
                                                nombreCompleto:nombre,
                                                ciudad: ciudad,
                                                pais:pais,
                                                comentario:comentario
                                                })
      .then(value => {
        Swal.fire({
          position: 'top-right',
          icon:"success",
          title: 'Se envio tu comentario',
          showConfirmButton: false,
          timer: 1500
        })

        this.datos = {
          fecha:'',
          hora: '',
          nombreCompleto:'',
          ciudad: '',
          pais:'',
          comentario:''
        }
      })
  }

}
