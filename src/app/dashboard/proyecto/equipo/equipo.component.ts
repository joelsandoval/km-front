import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsignacionF, Fisica } from 'src/app/model/personas';
import { EquipoNuevoComponent } from '../equipo-nuevo/equipo-nuevo.component';
import { ServiciosNuevoComponent } from '../servicios-nuevo/servicios-nuevo.component';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  @Input() proyecto!: number;

  equipo: Fisica[] = [];

  constructor(
    public dialog: MatDialog,
    public servicio: ProyectosService
  ) { }

  ngOnInit(): void {
    this.servicio.getEquipo(this.proyecto).subscribe(
      (result: Fisica[]) => {
        this.equipo = result;
        console.log(this.equipo);
      }
    )
  }

  
  nuevoEquipo() {
    const dialogNuevo = this.dialog.open(EquipoNuevoComponent,
      {
        width: '450px',
        data: this.proyecto,
      }
    );

    dialogNuevo.afterClosed().subscribe(
      (result: Fisica) => {
        if (result) {
          
          this.equipo.push(result);

        }
      }
    );
  }


}


