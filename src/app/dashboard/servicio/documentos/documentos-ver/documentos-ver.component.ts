import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Archivo } from 'src/app/model/archivos';
import { ExpedienteServicioF } from 'src/app/model/expediente';
import { ArchivosService } from 'src/app/services/archivos.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

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
    private serviceFU: FileUploadService
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
    this.serviceFU.downloadFile(ruta, filename);
  }

}
