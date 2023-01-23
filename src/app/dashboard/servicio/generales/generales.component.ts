import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActividadF, DataServicio, Servicio, ServicioF } from 'src/app/model/proyecto';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ExpedienteServicioF } from 'src/app/model/expediente';
import { FisicaF } from 'src/app/model/personas';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {
  
  servicios: Servicio[] = [];
  servicio: ServicioF = new ServicioF();
  expedienteSel: ExpedienteServicioF = new ExpedienteServicioF();

  id!: number;
  seleccionado: ActividadF = new ActividadF();
  
  cliente: number = 1;
  data: DataServicio = new DataServicio();

  personas: FisicaF[] = [];
  persona: FisicaF = new FisicaF();

  constructor(
    private route: ActivatedRoute,
    private servicioP: ProyectosService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => {
        this.data.servicio = +param.get('servicio')!;
        this.data.proyecto = +param.get('proyecto')!;
        this.data.cliente = this.cliente;
        
        this.servicioP.getProyectoServicio(this.data.servicio).subscribe(
          servicio => {
            this.servicio = servicio;
          }
        )

      }
    )
  }

  seleccionaActividad(dato: ActividadF) {
    this.seleccionado = dato;
  }

  seleccionaExpediente(dato: ExpedienteServicioF) {
    this.expedienteSel = dato;
  }


}
