import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogosComponent } from './catalogos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { PersonasComponent } from './personas/personas.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CatalogosRoutingModule } from './catalogos-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ServiciosDelComponent } from './servicios/servicios-del/servicios-del.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ServiciosDocumentosComponent } from './servicios/servicios-documentos/servicios-documentos.component';
import { ServiciosActividadesComponent } from './servicios/servicios-actividades/servicios-actividades.component';
import { ServiciosNuevoComponent } from './servicios/servicios-nuevo/servicios-nuevo.component';
import { ServiciosDocumentosAddComponent } from './servicios/servicios-documentos-add/servicios-documentos-add.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DocumentosComponent } from './documentos/documentos.component';
import { DocumentosDelComponent } from './documentos/documentos-del/documentos-del.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActividadesDelComponent } from './actividades/actividades-del/actividades-del.component';
import { ServiciosActividadesAddComponent } from './servicios/servicios-actividades-add/servicios-actividades-add.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    CatalogosComponent,
    ServiciosComponent,
    PersonasComponent,
    ServiciosDelComponent,
    ServiciosDocumentosComponent,
    ServiciosActividadesComponent,
    ServiciosNuevoComponent,
    ServiciosDocumentosAddComponent,
    DocumentosComponent,
    DocumentosDelComponent,
    ActividadesComponent,
    ActividadesDelComponent,
    ServiciosActividadesAddComponent
  ],
  imports: [
    CommonModule,
    CatalogosRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    NgHttpLoaderModule.forRoot(),
    MatSlideToggleModule,
    MatTooltipModule, 
    MatTableModule
  ]
})
export class CatalogosModule { }
