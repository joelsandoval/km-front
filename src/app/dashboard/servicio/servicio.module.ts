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
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ActividadesNuevoComponent } from './actividades-nuevo/actividades-nuevo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    ServicioComponent,
    GeneralesComponent,
    ActividadesComponent,
    EquipoComponent,
    ActividadesNuevoComponent
  ],
  imports: [
    CommonModule,
    ServicioRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatInputModule,
    MatMenuModule
  ]
})
export class ServicioModule { }
