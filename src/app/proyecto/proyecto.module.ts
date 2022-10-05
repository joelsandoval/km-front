import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoComponent } from './proyecto.component';
import { GeneralesComponent } from './generales/generales.component';
import { ProyectoRoutingModule } from './proyecto-routing.module';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    ProyectoComponent,
    GeneralesComponent
  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    MatTabsModule
  ]
})
export class ProyectoModule { }
