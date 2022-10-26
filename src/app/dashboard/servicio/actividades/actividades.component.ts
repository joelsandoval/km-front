import { Component, Input, OnInit } from '@angular/core';
import { Calendario } from 'src/app/model/proyecto';
import { Output, EventEmitter } from '@angular/core';
import * as global from 'src/app/model/global'
import { MatDialog } from '@angular/material/dialog';
import { ActividadesNuevoComponent } from '../actividades-nuevo/actividades-nuevo.component';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  @Input() servicio!: number;
  @Output() actividadCambia = new EventEmitter<Calendario>();

  calendario: Calendario[] = [];

  
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ActividadesNuevoComponent, {
      data: 1,
    });
  }

  ngOnInit(): void {
    this.calendario = global.calendario;
  }

  selectActividad(value: Calendario) {
    this.actividadCambia.emit(value);
  }



}
