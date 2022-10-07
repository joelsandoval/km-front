import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipoComponent } from './equipo/equipo.component';
import { GeneralesComponent } from './generales/generales.component';
import { HistorialComponent } from './historial/historial.component';
import { ProyectoComponent } from './proyecto.component';
import { ServiciosComponent } from './servicios/servicios.component';


const routes: Routes = [
  {
    path: '', 
    component: ProyectoComponent, 
    children: [
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
