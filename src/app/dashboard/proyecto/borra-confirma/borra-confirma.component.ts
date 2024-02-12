import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Archivo } from 'src/app/model/archivos';
import { SegUsuarios } from 'src/app/model/seguridad/user';
import { ArchivosService } from 'src/app/services/archivos.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

export interface Confirma {
  tipo: number;
  mensaje: string;
  archivo: Archivo;
  equipo: SegUsuarios;
  proyecto: number;
}

@Component({
  selector: 'app-borra-confirma',
  templateUrl: './borra-confirma.component.html',
  styleUrls: ['./borra-confirma.component.css']
})
export class BorraConfirmaComponent implements OnInit{
  
  
  constructor(
    public dialogRef: MatDialogRef<BorraConfirmaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Confirma,
    private service: ArchivosService,
    private serviceP: ProyectosService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  borraArchivo() {
    this.service.borraArchivo(this.data.archivo).subscribe(
      result => this.dialogRef.close(result)
    )
  }

  borraEquipo() {
    this.serviceP.delEquipo(this.data.proyecto, this.data.equipo.id).subscribe(
      result => this.dialogRef.close(this.data.equipo)
    )
  }

}
