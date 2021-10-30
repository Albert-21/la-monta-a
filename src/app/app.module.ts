import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HomeComponent } from './componentes/home/home.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LoginComponent } from './componentes/login/login.component';
import { UbicacionComponent } from './componentes/ubicacion/ubicacion.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { GaleriaComponent } from './componentes/galeria/galeria.component';
import { QuienesSomosComponent } from './componentes/quienes-somos/quienes-somos.component';
import { AvisoPrivacidadComponent } from './componentes/aviso-privacidad/aviso-privacidad.component';
import { CuentanosTuExperienciaComponent } from './componentes/cuentanos-tu-experiencia/cuentanos-tu-experiencia.component';
import { ContactanosComponent } from './componentes/contactanos/contactanos.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { InventarioComponent } from './componentes/inventario/inventario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    UbicacionComponent,
    MenuComponent,
    GaleriaComponent,
    QuienesSomosComponent,
    AvisoPrivacidadComponent,
    CuentanosTuExperienciaComponent,
    ContactanosComponent,
    VentasComponent,
    InventarioComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        LightboxModule,
        BrowserAnimationsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
