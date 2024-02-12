import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentosComponent } from './documentos/documentos.component';
import { EquipoComponent } from './equipo/equipo.component';
import { GeneralesComponent } from './generales/generales.component';
import { HistorialComponent } from './historial/historial.component';
import { ProyectoComponent } from './proyecto.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { DocumentosAllComponent } from './documentos-all/documentos-all.component';


const routes: Routes = [
  {
    path: '', 
    component: ProyectoComponent, 
    children: [
      {
        path: ':proyecto',
        component: GeneralesComponent,
      },
      {
        path: 'generales/:proyecto',
        component: GeneralesComponent,
      },
      {
        path: 'servicios/:proyecto',
        component: ServiciosComponent,
      },
      {
        path: 'equipo/:proyecto',
        component: EquipoComponent,
      },
      {
        path: 'historial/:proyecto',
        component: HistorialComponent,
      },
      {
        path: 'documentos/:proyecto',
        component: DocumentosAllComponent,
      },
      {
        path: '',
        component: GeneralesComponent,
      }        
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectoRoutingModule { }
