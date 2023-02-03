import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosComponent } from './proyectos.component';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ListadoComponent } from './listado/listado.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NuevoComponent } from './nuevo/nuevo.component';
import { FormsModule } from '@angular/forms';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 

@NgModule({
  declarations: [
    ProyectosComponent,
    ListadoComponent,
    NuevoComponent,
    ProyectoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ProyectosRoutingModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatTabsModule,
    MatTooltipModule,
    MatSnackBarModule
  ]
})
export class ProyectosModule { }
