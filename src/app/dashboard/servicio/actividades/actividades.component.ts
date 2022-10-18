import { Component, Input, OnInit } from '@angular/core';
import { Calendario } from 'src/app/model/proyecto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  @Input() servicio!: number;

  calendario: Calendario[] = [];

  
  constructor() { }

  ngOnInit(): void {
    this.calendario = environment.calendario;
  }

}
