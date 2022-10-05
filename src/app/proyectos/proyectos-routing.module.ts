import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralesComponent } from './generales/generales.component';
import { ListadoComponent } from './listado/listado.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { ProyectosComponent } from './proyectos.component';


const routes: Routes = [
  {
    path: '', 
    component: ProyectosComponent, 
    children: [
      {
        path: 'listado/:tipo',
        component: ListadoComponent,
      },
      {
        path: 'nuevo',
        component: NuevoComponent,
      },
      {
        path: 'proyecto/:id',
        component: ProyectoComponent
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
export class ProyectosRoutingModule { }
