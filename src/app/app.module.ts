import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProyectosModule } from './dashboard/proyectos/proyectos.module';
import { ServiciosModule } from './dashboard/servicios/servicios.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ServicioModule } from './dashboard/servicio/servicio.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    NgbModule,
    ProyectosModule,
    ServiciosModule,
    ServicioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
