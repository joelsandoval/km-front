import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralesComponent } from './generales/generales.component';
import { ProyectoComponent } from './proyecto.component';


const routes: Routes = [
  {
    path: '', 
    component: ProyectoComponent, 
    children: [
      {
        path: 'generales/:proyecto',
        component: GeneralesComponent,
        //canDeactivate: [CanDeactivateGuard],
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
