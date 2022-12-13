import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActividadF, Calendario, Servicio, ServicioF } from 'src/app/model/proyecto';
import * as global from 'src/app/model/global';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Fisica } from 'src/app/model/personas';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {

  servicios: Servicio[] = [];
  servicio!: ServicioF;
  id!: number;
  seleccionado: ActividadF = new ActividadF();
  folders = global.folders;
  notes = global.notes;
  personas: Fisica[] = [];


  constructor(
    private route: ActivatedRoute,
    private servicioP: ProyectosService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => {
        this.id = +param.get('servicio')!;
        this.servicioP.getProyectoServicio(this.id).subscribe(
          servicio => {
            this.servicio = servicio;
          }
        )

      }
    )
  }

  seleccionaActividad(dato: ActividadF) {
    this.seleccionado = dato;
    console.log('del hijo al padre');
    console.log(dato);
  }

}
