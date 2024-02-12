import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsignacionF, Fisica } from 'src/app/model/personas';
import { EquipoNuevoComponent } from '../equipo-nuevo/equipo-nuevo.component';
import { ServiciosNuevoComponent } from '../servicios-nuevo/servicios-nuevo.component';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { SegUsuarios } from 'src/app/model/seguridad/user';
import { BorraConfirmaComponent } from '../borra-confirma/borra-confirma.component';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  @Input() proyecto!: number;

  equipo: SegUsuarios[] = [];

  constructor(
    public dialog: MatDialog,
    public servicio: ProyectosService
  ) { }

  ngOnInit(): void {
    this.servicio.getEquipo(this.proyecto).subscribe(
      (result: SegUsuarios[]) => {
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
      (result: SegUsuarios) => {
        if (result) {
          
          this.equipo.push(result);

        }
      }
    );
  }

  borraEquipo(usuario: SegUsuarios) {
    const dialogNuevo = this.dialog.open(BorraConfirmaComponent,
      {
        width: '500px',
        height: '200px',
        data: {
          tipo: 2,
          mensaje: `¿Está seguro de quitar a ${usuario.nombre} del equipo de trabajo?`,
          equipo: usuario,
          proyecto: this.proyecto
        }
      }
    );

    dialogNuevo.afterClosed().subscribe(
      (result: SegUsuarios) => {
        if(result) {
          let index = this.equipo.findIndex(x => x.id === usuario.id);
          this.equipo.splice(index, 1);
        }
      }
    );

  }
}


