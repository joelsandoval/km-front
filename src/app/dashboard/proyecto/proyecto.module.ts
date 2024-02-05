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
import { MatFormFieldModule } from '@angular/material/form-field';
import { ServiciosNuevoComponent } from './servicios-nuevo/servicios-nuevo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DocumentosComponent } from './documentos/documentos.component';
import { MatCardModule } from '@angular/material/card';
import { EquipoNuevoComponent } from './equipo-nuevo/equipo-nuevo.component';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    ProyectoComponent,
    GeneralesComponent,
    ServiciosComponent,
    EquipoComponent,
    HistorialComponent,
    ServiciosNuevoComponent,
    DocumentosComponent,
    EquipoNuevoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ProyectoRoutingModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    NgbModule,
    MatInputModule,
    MatCardModule,
    NgHttpLoaderModule
  ]
})
export class ProyectoModule { }
