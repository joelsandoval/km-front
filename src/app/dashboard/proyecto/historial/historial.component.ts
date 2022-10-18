import { Component, OnInit } from '@angular/core';
import { Evento, TimeLine } from 'src/app/model/proyecto';



@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  anios: number[] = [2019, 2020, 2021];
  eventos: TimeLine[] = [
    {
      anio: 2019,
      actividades: [
        {
          id: 1,
          anio: 2019,
          mes: 'Feb',
          dia: 23,
          fecha: '2019-02-23',
          evento: 'Algo paso este dia',
          tipo: 1,
          clase: 'timeline__card card'
        },
        {
          id: 2,
          anio: 2019,
          mes: 'Mar',
          dia: 2,
          fecha: '2019-03-02',
          evento: 'Algo paso este otro dia',
          tipo: 2,
          clase: 'timeline__card_p card'
        },
      ],
      tipo: 1
    },
    {
      anio: 2020,
      actividades: [
        {
          id: 7,
          anio: 2020,
          mes: 'Jun',
          dia: 23,
          fecha: '2020-06-23',
          evento: 'Esta es una actividad ',
          tipo: 1,
          clase: 'timeline__card card',

        },
        {
          id: 8,
          anio: 2020,
          mes: 'Jul',
          dia: 13,
          fecha: '2020-07-13',
          evento: 'Actividades programadas tambien deben incluirse',
          tipo: 2,
          clase: 'timeline__card_p card'
        },
        {
          id: 9,
          anio: 2021,
          mes: 'Jul',
          dia: 13,
          fecha: '2020-07-13',
          evento: 'Actividades programadas tambien deben incluirse',
          tipo: 1,
          clase: 'timeline__card card'
        },
        {
          id: 10,
          anio: 2022,
          mes: 'Jul',
          dia: 13,
          fecha: '2020-07-13',
          evento: 'Actividades programadas tambien deben incluirse',
          tipo: 1,
          clase: 'timeline__card card'
        },
      ],
      tipo: 1
    },
    {
      anio: 2021,
      actividades: [
        {
          id: 3,
          anio: 2021,
          mes: 'Jun',
          dia: 23,
          fecha: '2020-06-23',
          evento: 'Esta es una actividad ',
          tipo: 1,
          clase: 'timeline__card card',

        },
        {
          id: 4,
          anio: 2021,
          mes: 'Jul',
          dia: 13,
          fecha: '2020-07-13',
          evento: 'Actividades programadas tambien deben incluirse',
          tipo: 2,
          clase: 'timeline__card_p card'
        },
        {
          id: 5,
          anio: 2021,
          mes: 'Jul',
          dia: 13,
          fecha: '2020-07-13',
          evento: 'Actividades programadas tambien deben incluirse',
          tipo: 1,
          clase: 'timeline__card card'
        },
        {
          id: 6,
          anio: 2021,
          mes: 'Jul',
          dia: 13,
          fecha: '2020-07-13',
          evento: 'Actividades programadas tambien deben incluirse',
          tipo: 1,
          clase: 'timeline__card card'
        },
      ],
      tipo: 1
    },
  ]

  seleccionado: Evento = new Evento();

  constructor() { }

  ngOnInit(): void {
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
