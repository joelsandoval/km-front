import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioComponent } from './servicio.component';


const routes: Routes = [
  {
    path: '', 
    component: ServicioComponent, 
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }
