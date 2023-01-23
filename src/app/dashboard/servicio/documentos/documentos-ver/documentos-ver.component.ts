import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Archivo } from 'src/app/model/archivos';
import { ExpedienteServicioF } from 'src/app/model/expediente';
import { ArchivosService } from 'src/app/services/archivos.service';

@Component({
  selector: 'app-documentos-ver',
  templateUrl: './documentos-ver.component.html',
  styleUrls: ['./documentos-ver.component.css']
})

export class DocumentosVerComponent implements OnInit {
  archivos: Archivo[] = []; 
  constructor(
    public dialogRef: MatDialogRef<DocumentosVerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExpedienteServicioF,
    private serviceA: ArchivosService,
  ) { }

  ngOnInit(): void {
    this.serviceA.getPorExpediente(this.data.id).subscribe(
      archis => this.archivos = archis
    )
  }

  descargaArchivos() {
    this.serviceA.getPorExpediente(this.data.id).subscribe(
      archivos => {
        archivos.forEach(
          archivo => {
            this.descargaArchivo(archivo.ruta, archivo.archivo);
          }
        )
      }
    ) 
  }

  descargaArchivo(ruta: string, filename: string): void {
    this.serviceA.downloadFile(ruta, filename);
  }

}
