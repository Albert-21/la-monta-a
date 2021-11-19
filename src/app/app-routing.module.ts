import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AvisoPrivacidadComponent} from './componentes/aviso-privacidad/aviso-privacidad.component';
import {ContactanosComponent} from './componentes/contactanos/contactanos.component';
import {HomeComponent} from './componentes/home/home.component';
import {MenuComponent} from './componentes/menu/menu.component';
import {CuentanosTuExperienciaComponent} from './componentes/cuentanos-tu-experiencia/cuentanos-tu-experiencia.component';
import {ComentariosComponent} from "./componentes/comentarios/comentarios.component";
import {GaleriaComponent} from './componentes/galeria/galeria.component';
import {LoginComponent} from './componentes/login/login.component';
import {UbicacionComponent} from './componentes/ubicacion/ubicacion.component';
import {VentasComponent} from './componentes/ventas/ventas.component';
import {InventarioComponent} from './componentes/inventario/inventario.component';
import {QuienesSomosComponent} from './componentes/quienes-somos/quienes-somos.component';

import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToInventory = () => redirectLoggedInTo(['inventario']);

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
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToInventory }
  },
  {
    path: "ubicacion",
    component: UbicacionComponent
  },
  {
    path: "ventas",
    component: VentasComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "comentarios",
    component: ComentariosComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "inventario",
    component: InventarioComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }

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
