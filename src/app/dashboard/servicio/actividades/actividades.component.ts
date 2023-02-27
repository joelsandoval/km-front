import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ActividadF, Calendario } from 'src/app/model/proyecto';
import * as global from 'src/app/model/global'
import { MatDialog } from '@angular/material/dialog';
import { ActividadesNuevoComponent } from '../actividades-nuevo/actividades-nuevo.component';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Fisica } from 'src/app/model/personas';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  @Input() servicio!: number;
  @Output() actividadCambia = new EventEmitter<ActividadF>();

  calendario: Calendario[] = [];
  actividades: ActividadF[] = [];
  seleccionado: ActividadF = new ActividadF();
  personas: Fisica[] = [];
  folders = global.folders;
  notes = global.notes;

  constructor(
    public dialog: MatDialog,
    public service: ProyectosService
  ) { }


  ngOnInit(): void {

    this.service.getProyectoActividades(this.servicio).subscribe(
      actis => {
        this.actividades = actis;
      }
    )
    this.calendario = global.calendario;
  }


  openDialog() {
    const dialogRef = this.dialog.open(ActividadesNuevoComponent, {
      data: {
        origen: 1,
        servicio: this.servicio,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.actividades.unshift(result);
      console.log(`Dialog result:`);
      console.log(result);
    });
  }


  paraVer(): void {
    // get a reference to your table by id
    // cast this to HTMLTableElement in TypeScript
    const table: HTMLTableElement | null = document.querySelector('#tblServicios');

    // get all rows in the first table body
    const rows = table!.tBodies[0].rows;

    // convert the rows to an array with the spread operator (...)
    // then iterate over each row using forEach
    Array.from(rows).forEach((row: any, idx) => {
      // attach a click handler on each row
      row.addEventListener('click', (_event: any) => {
        // get all cells in the row, convert them to an array with the spread operator (...)
        // then for each cell, return its textContent by mapping on the array
        const tds = Array.from(row.cells).map((td: any) => td.textContent);

        console.clear();
        // Log the row index
        console.log('row index:', idx);
        // Log the tds content array
        console.log('tds content:', ...tds);
        // join the contents of the tds with a space and display the string
        console.log('tds string:', tds.join(' '));
      });
    });
  }

  selectActividad(value: ActividadF) {
    this.actividadCambia.emit(value);
    this.seleccionado = value;
  }

  delete(actividad: ActividadF, ev: any) {
    this.service.delActividadServicio(actividad.id).subscribe(
      nada => console.log('se borro')
    )

  }

}
