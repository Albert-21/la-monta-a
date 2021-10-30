import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AvisoPrivacidadComponent} from './componentes/aviso-privacidad/aviso-privacidad.component';
import {ContactanosComponent} from './componentes/contactanos/contactanos.component';
import {HomeComponent} from './componentes/home/home.component';
import {MenuComponent} from './componentes/menu/menu.component';
import {CuentanosTuExperienciaComponent} from './componentes/cuentanos-tu-experiencia/cuentanos-tu-experiencia.component';
import {GaleriaComponent} from './componentes/galeria/galeria.component';
import {LoginComponent} from './componentes/login/login.component';
import {UbicacionComponent} from './componentes/ubicacion/ubicacion.component';
import {VentasComponent} from './componentes/ventas/ventas.component';
import {InventarioComponent} from './componentes/inventario/inventario.component';
import {QuienesSomosComponent} from './componentes/quienes-somos/quienes-somos.component';



const routes: Routes = [
  {
    path:"",
    redirectTo:"home",
    pathMatch: 'full'
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "aviso-privacidad",
    component: AvisoPrivacidadComponent
  },
  {
    path: "contactanos",
    component: ContactanosComponent
  },
  {
    path: "menu",
    component: MenuComponent
  },
  {
    path: "cuentanos-tu-experiencia",
    component: CuentanosTuExperienciaComponent
  },
  {
    path: "galeria",
    component: GaleriaComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "ubicacion",
    component: UbicacionComponent
  },
  {
    path: "ventas",
    component: VentasComponent
  },
  {
    path: "inventario",
    component: InventarioComponent
  },
  {
    path: "quienes-somos",
    component: QuienesSomosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }