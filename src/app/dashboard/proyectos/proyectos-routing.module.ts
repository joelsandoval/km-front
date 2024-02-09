import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './listado/listado.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { ProyectosComponent } from './proyectos.component';
import { PendientesComponent } from './pendientes/pendientes.component';


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
        path: 'pendientes/:nivel/:usuario',
        component: PendientesComponent,
      },
      {
        path: '',
        component: ListadoComponent,
      },        
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }
