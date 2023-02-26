import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoComponent } from './proyecto.component';
import { GeneralesComponent } from './generales/generales.component';
import { ProyectoRoutingModule } from './proyecto-routing.module';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { ServiciosComponent } from './servicios/servicios.component';
import { EquipoComponent } from './equipo/equipo.component';
import { HistorialComponent } from './historial/historial.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ServiciosNuevoComponent } from './servicios-nuevo/servicios-nuevo.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { DocumentosComponent } from './documentos/documentos.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
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
    FormsModule,
    MatInputModule,
    MatCardModule,
    NgHttpLoaderModule
  ]
})
export class ProyectoModule { }
