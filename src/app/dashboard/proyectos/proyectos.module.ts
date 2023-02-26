import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosComponent } from './proyectos.component';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { ListadoComponent } from './listado/listado.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { NuevoComponent } from './nuevo/nuevo.component';
import { FormsModule } from '@angular/forms';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { HttpClientModule } from '@angular/common/http';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar'; 
import { NgHttpLoaderModule } from 'ng-http-loader';

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
    MatSnackBarModule,
    NgHttpLoaderModule
  ]
})
export class ProyectosModule { }
