import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comentariosComponent',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  date= new Date();
  totalVendido=0;
  constructor() { }

  ngOnInit(): void {
  }

}
