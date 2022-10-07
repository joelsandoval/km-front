import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoComponent } from './proyecto.component';
import { GeneralesComponent } from './generales/generales.component';
import { ProyectoRoutingModule } from './proyecto-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ServiciosComponent } from './servicios/servicios.component';
import { EquipoComponent } from './equipo/equipo.component';
import { HistorialComponent } from './historial/historial.component';


@NgModule({
  declarations: [
    ProyectoComponent,
    GeneralesComponent,
    ServiciosComponent,
    EquipoComponent,
    HistorialComponent
  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class ProyectoModule { }
