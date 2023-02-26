import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogosComponent } from './catalogos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { PersonasComponent } from './personas/personas.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { CatalogosRoutingModule } from './catalogos-routing.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { FormsModule } from '@angular/forms';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { ServiciosDelComponent } from './servicios/servicios-del/servicios-del.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ServiciosDocumentosComponent } from './servicios/servicios-documentos/servicios-documentos.component';
import { ServiciosActividadesComponent } from './servicios/servicios-actividades/servicios-actividades.component';
import { ServiciosNuevoComponent } from './servicios/servicios-nuevo/servicios-nuevo.component';
import { ServiciosDocumentosAddComponent } from './servicios/servicios-documentos-add/servicios-documentos-add.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { DocumentosComponent } from './documentos/documentos.component';
import { DocumentosDelComponent } from './documentos/documentos-del/documentos-del.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { ActividadesDelComponent } from './actividades/actividades-del/actividades-del.component';
import { ServiciosActividadesAddComponent } from './servicios/servicios-actividades-add/servicios-actividades-add.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { PersonasNuevoComponent } from './personas/personas-nuevo/personas-nuevo.component';





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
    ServiciosActividadesAddComponent,
    PersonasNuevoComponent
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
    NgHttpLoaderModule,
    MatTableModule,
  ]
})
export class CatalogosModule { }
