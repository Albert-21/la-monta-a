import { Component, OnInit } from '@angular/core';
import {Lightbox} from "ngx-lightbox";


@Component({
  selector: 'galeria-component',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent {
  imagenes = document.querySelectorAll(".img-fluid");
  imagenesLight = document.querySelector(".agregar-imagen");
  contenedorlight = document.querySelector(".imagen-light");
  _album: Array<any> = [];
  status: Boolean = false;

  constructor(private _lightbox: Lightbox) {
    for (let i = 18; i <= 33; i++) {
      const src = 'assets/img/img-' + i + '.jpg';
      const thumb = 'assets/img/img-' + i + '-thumb.png';
      const album = {src: src, thumb: thumb};
      this._album.push(album);
    }
  }

  open(index: number): void {
    this._lightbox.open(this._album, index);
  }

  close(): void {
    this._lightbox.close();
  }

  isVisible(): void {
    this.status = true;

  }
}
