import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentoNuevoComponent } from '../documento-nuevo/documento-nuevo.component';
import { Archivo } from 'src/app/model/archivos';
import { ArchivosService } from 'src/app/services/archivos.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { BorraConfirmaComponent } from '../borra-confirma/borra-confirma.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  @Input() proyecto!: number;
  archivos: Archivo[] = [];

  constructor(
    public dialog: MatDialog,
    private serviceArch: ArchivosService,
    private serviceFile: FileUploadService
  ) { }

  ngOnInit(): void {
    this.serviceArch.getDocumentosProyecto(this.proyecto).subscribe(
      archivos => this.archivos = archivos
    );
  }

  nuevoDocumento() {
    const dialogNuevo = this.dialog.open(DocumentoNuevoComponent,
      {
        width: '450px',
        data: {
          cliente: 1,
          proyecto: this.proyecto,
          origen: 2
        }
      }
    );

    dialogNuevo.afterClosed().subscribe(
      (result: Archivo) => {
        if (result) {

          this.archivos.push(result);

        }
      }
    );
  }


  descargaArchivo(ruta: string, tipo: string): void {
    this.serviceFile.downloadFile(ruta, tipo);
  }

  borraDocumento(archivo: Archivo) {
    const dialogNuevo = this.dialog.open(BorraConfirmaComponent,
      {
        width: '500px',
        height: '200px',
        data: {
          tipo: 1,
          mensaje: `¿Está seguro de borrar el archivo ${archivo.archivo}?`,
          archivo: archivo
        }
      }
    );

    dialogNuevo.afterClosed().subscribe(
      (result: Archivo) => {
          let index = this.archivos.findIndex(x => x.id === archivo.id);
          this.archivos.splice(index, 1);
      }
    );
  }

}
