import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActividadF, Calendario } from 'src/app/model/proyecto';
import * as global from 'src/app/model/global'
import { MatDialog } from '@angular/material/dialog';
import { ActividadesNuevoComponent } from '../actividades-nuevo/actividades-nuevo.component';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  @Input() servicio!: number;
  @Output() actividadCambia = new EventEmitter<ActividadF>();

  calendario: Calendario[] = [];
  actividades: ActividadF[] = [];


  
  constructor(
    public dialog: MatDialog,
    public service: ProyectosService
    ) {}

  openDialog() {
    this.dialog.open(ActividadesNuevoComponent, {
      data: 1,
    });
  }

  ngOnInit(): void {

    this.service.getProyectoActividades(this.servicio).subscribe(
      actis => {
        this.actividades = actis;
        console.log(actis);
      } 
    )
    this.calendario = global.calendario;
  }

  selectActividad(value: ActividadF) {
    this.actividadCambia.emit(value);
  }



}
