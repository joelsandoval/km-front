import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrincipalGuard } from './services/guards/principal.guard';

const routes: Routes = [
  {
    path: 'proyectos',
    loadChildren: () => import('./dashboard/proyectos/proyectos.module').then(mod => mod.ProyectosModule),
    data: { requiredRoles: ['app-admin', 'app-user']}, canActivate: [PrincipalGuard]
  },
  {
    path: 'proyecto/:id',
    loadChildren: () => import('./dashboard/proyecto/proyecto.module').then(mod => mod.ProyectoModule),
    data: { preload: true },
  },
  {
    path: 'servicios',
    loadChildren: () => import('./dashboard/servicios/servicios.module').then(mod => mod.ServiciosModule),
    data: { preload: true },
  },
  {
    path: 'servicio/:servicio/:proyecto',
    loadChildren: () => import('./dashboard/servicio/servicio.module').then(mod => mod.ServicioModule),
    data: { preload: true },
  },
  {
    path: 'catalogos',
    loadChildren: () => import('./dashboard/catalogos/catalogos.module').then(mod => mod.CatalogosModule),
    data: { preload: true },
  },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
