import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioComponent } from './servicio.component';
import { ServicioRoutingModule } from './servicio-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ServicioComponent
  ],
  imports: [
    CommonModule,
    ServicioRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ServicioModule { }
