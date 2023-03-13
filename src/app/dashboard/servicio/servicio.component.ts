import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServicio, ServicioF } from 'src/app/model/proyecto';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    /* this.route.paramMap.subscribe(
      par => {
        this.data.cliente = this.cliente;
        this.data.servicio = +par.get('servicio')!;
        this.data.proyecto = +par.get('proyecto')!;
      }
    ) */
    this.route.queryParams.subscribe(
      (params) => {
        this.servicio = JSON.parse(atob(params['servicio']));
        console.log(this.servicio);
      }
    )
    
  }

  documentos(){
    this.router.navigate(['documentos', this.servicio.id], { relativeTo: this.route, queryParams: {
      servicio: JSON.stringify(this.servicio),
    } });
  }

}
