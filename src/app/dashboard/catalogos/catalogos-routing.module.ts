import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './servicios/servicios.component';
import { CatalogosComponent } from './catalogos.component';
import { PersonasComponent } from './personas/personas.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


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
        path: 'documentos',
        component: DocumentosComponent,
      },
      {
        path: 'actividades',
        component: ActividadesComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
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
