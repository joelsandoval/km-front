import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './actividades/actividades.component';
import { EquipoComponent } from './equipo/equipo.component';
import { GeneralesComponent } from './generales/generales.component';
import { ServicioComponent } from './servicio.component';


const routes: Routes = [
  {
    path: '', 
    component: ServicioComponent, 
    children: [
      {
        path: 'generales/:servicio/:proyecto',
        component: GeneralesComponent,
      },
      {
        path: 'actividades/:servicio',
        component: ActividadesComponent,
      },
      {
        path: 'equipo/:servicio',
        component: EquipoComponent,
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
export class ServicioRoutingModule { }
