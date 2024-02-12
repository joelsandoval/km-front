import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './actividades/actividades.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { EquipoComponent } from './equipo/equipo.component';
import { GeneralesComponent } from './generales/generales.component';
import { ServicioComponent } from './servicio.component';


const routes: Routes = [
  {
    path: '', 
    component: ServicioComponent, 
    children: [
      {
        path: 'generales/:servi',
        component: GeneralesComponent,
      },
      {
        path: 'documentos/:servi',
        component: DocumentosComponent,
      },
      {
        path: 'actividades/:servi',
        component: ActividadesComponent,
      },
      {
        path: 'equipo/:servi',
        component: EquipoComponent,
      },
      {
        path: '',
        component: ActividadesComponent,
      }
      ,
      {
        path: ':servi',
        component: ActividadesComponent,
      }        
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }
