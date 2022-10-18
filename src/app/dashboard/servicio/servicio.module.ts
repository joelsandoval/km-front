import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioComponent } from './servicio.component';
import { ServicioRoutingModule } from './servicio-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GeneralesComponent } from './generales/generales.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { EquipoComponent } from './equipo/equipo.component';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    ServicioComponent,
    GeneralesComponent,
    ActividadesComponent,
    EquipoComponent
  ],
  imports: [
    CommonModule,
    ServicioRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class ServicioModule { }
