import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsignacionF } from 'src/app/model/personas';
import { EquipoNuevoComponent } from '../equipo-nuevo/equipo-nuevo.component';
import { ServiciosNuevoComponent } from '../servicios-nuevo/servicios-nuevo.component';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  @Input() proyecto!: number;

  equipo: AsignacionF[] = [];

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log('equipo');
    console.log(this.proyecto);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ServiciosNuevoComponent);

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(`Dialog result: ${result}`);
      }
    );
  }

  nuevoEquipo() {
    const dialogNuevo = this.dialog.open(EquipoNuevoComponent,
      {
        width: '350px',
        data: new AsignacionF(this.proyecto),
      }
    );

    dialogNuevo.afterClosed().subscribe(
      (result: AsignacionF) => {
        this.equipo.push(result);
      }
    );
  }


}


