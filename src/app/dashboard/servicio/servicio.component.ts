import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServicio } from 'src/app/model/proyecto';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  cliente: number = 1;
  data: DataServicio = new DataServicio();

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      par => {
        this.data.cliente = this.cliente;
        this.data.servicio = +par.get('servicio')!;
        this.data.proyecto = +par.get('proyecto')!;
      }
    )
  }

}
