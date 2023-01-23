import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './servicios/servicios.component';
import { CatalogosComponent } from './catalogos.component';
import { PersonasComponent } from './personas/personas.component';


const routes: Routes = [
  {
    path: '', 
    component: CatalogosComponent, 
    children: [
      {
        path: 'servicios',
        component: ServiciosComponent,
      },
      {
        path: 'personas',
        component: PersonasComponent,
      },
      {
        path: '',
        component: ServiciosComponent,
      }       
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogosRoutingModule { }
