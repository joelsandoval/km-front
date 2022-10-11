import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  
  {
    path: 'proyectos',
    loadChildren: () => import('./proyectos/proyectos.module').then(mod => mod.ProyectosModule),
    data: { preload: true },
  },
  {
    path: 'proyecto/:id',
    loadChildren: () => import('./proyecto/proyecto.module').then(mod => mod.ProyectoModule),
    data: { preload: true },
  },
  {
    path: 'servicios',
    loadChildren: () => import('./servicios/servicios.module').then(mod => mod.ServiciosModule),
    data: { preload: true },
  },
  {
    path: 'servicio/:id',
    loadChildren: () => import('./servicio/servicio.module').then(mod => mod.ServicioModule),
    data: { preload: true },
  },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
