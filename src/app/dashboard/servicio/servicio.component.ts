import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServicio, ServicioF } from 'src/app/model/proyecto';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  cliente: number = 1;
  servicio: ServicioF = new ServicioF();


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProyectosService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.service.getProyectoServicio(params['servi']).subscribe(
          (resulta: ServicioF) => {
            this.servicio = resulta
          }
        )
      }
    )

  }

  documentos() {
    this.router.navigate(['documentos', this.servicio.id], {
      relativeTo: this.route, queryParams: {
        servicio: btoa(JSON.stringify(this.servicio)),
      }
    });
  }

  actividades() {
    this.router.navigate(['actividades', this.servicio.id], {
      relativeTo: this.route,
      queryParams: {
        servicio: btoa(JSON.stringify(this.servicio)),
      },
    });
  }


}
