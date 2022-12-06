import { Component, OnInit } from '@angular/core';
import { Evento, TimeLine } from 'src/app/model/proyecto';
import { environment } from 'src/environments/environment';
import * as global from '../../../model/global';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  anios: number[] = [2019, 2020, 2021];
  eventos: TimeLine[] = [];

  seleccionado: Evento = new Evento();

  constructor() { }

  ngOnInit(): void {
    this.eventos = global.eventos;
    console.log(this.eventos);
  }

  cargaActividad(evento: Evento) {
    console.log(evento);
    this.seleccionado = evento;
  } 

  nuevaActividad() {
    console.log('nueva');
  }
}
