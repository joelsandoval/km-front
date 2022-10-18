import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servicio } from 'src/app/model/proyecto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {

  servicios: Servicio[] = [];
  servicio!: Servicio;
  id!: number;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => {
        this.id = +param.get('servicio')!;
        this.servicios = environment.servicios;
        this.servicio = this.servicios.filter((serv) => serv.id == this.id)[0];
        console.log('servicio individual');
        console.log(this.servicio);
      }
    )
  }

}
