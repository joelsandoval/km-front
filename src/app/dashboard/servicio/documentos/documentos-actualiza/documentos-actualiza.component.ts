import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpedienteServicio, ExpedienteServicioF } from 'src/app/model/expediente';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

export interface DocumentosActualiza {
  documentos: ExpedienteServicioF[];
  tramite: number;
  vacio: boolean;
  user: number;
  area: number;
}


@Component({
  selector: 'app-documentos-actualiza',
  templateUrl: './documentos-actualiza.component.html',
  styleUrls: ['./documentos-actualiza.component.css']
})
export class DocumentosActualizaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DocumentosActualizaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DocumentosActualiza,
    private service: ExpedienteService,
    private serviceP: ProyectosService
  ) { }

  ngOnInit() {

    console.log(this.data);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
