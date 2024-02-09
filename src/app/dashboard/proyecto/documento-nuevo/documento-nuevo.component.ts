import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Archivo } from 'src/app/model/archivos';
import { ExpCatDocumentos, ExpCatDocumentosCatego, ExpedienteServicio } from 'src/app/model/expediente';
import { ArchivosService } from 'src/app/services/archivos.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

export interface Documento {
  cliente: number;
  proyecto: number;
  origen: number;
}

@Component({
  selector: 'app-documento-nuevo',
  templateUrl: './documento-nuevo.component.html',
  styleUrls: ['./documento-nuevo.component.css']
})
export class DocumentoNuevoComponent implements OnInit {
  
  fileToUpload!: File;
  fileArray!: FileList;
  archivos: Archivo[] = [];
  tipos: ExpCatDocumentos[] = [];
  catego: number = 1;
  categs: ExpCatDocumentosCatego = new ExpCatDocumentosCatego(); 
  categorias: ExpCatDocumentosCatego[] = [];
  expediente: ExpedienteServicio = new ExpedienteServicio();
  archivo!: string;
  otros!: string;
  agregar: boolean = true;
  puedeG: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DocumentoNuevoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Documento,
    private fileService: FileUploadService,
    private service: ArchivosService,
    private serviceExp: ExpedienteService
  ) { }

  ngOnInit(): void {
    console.log('entra a nuevo documento');

    this.serviceExp.getExpedienteCatDocsCatego().subscribe(
      cat => {
        this.categorias = cat;
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  uploadFiles() {
    console.log(this.fileArray);
    let x = 0;
    Array.from(this.fileArray).forEach(
      (element: File) => {
        this.fileService.postArchivoProyecto(element, this.data.cliente, this.data.proyecto).subscribe(
          (data: Archivo) => {
            data.descripcion = this.expediente.comentarios;
            data.tipo = 100;
            data.estatus = 1;
            data.fecha = new Date();
            /* data.autor = this.data.user; */
            console.log(data);
            this.service.updateArchivo(data).subscribe(
              (result: Archivo) => {
                if(result) {
                  this.dialogRef.close(result);
                }
              }
            );
          }
        )
      }, (error: any) => {
        console.log(error);
      });
  }


  handleFileInput(evento: any) {
    console.log(evento.target.files);
    let files: FileList = evento.target.files;
    if(files){
      this.fileArray = files;
    }
  }



  puedeGuardar(event: any) {
    console.log(event);
    console.log('Entra a validar')
    //debe seleccionar una categoria
    if (this.catego > 0) {
      console.log(`catego ${this.catego}`);
      //si la categoria es otros
      this.puedeG = false;
      console.log(`categoria ok ${this.puedeG}`);
    } else {
      console.log('entró al otros...')
      //si ya capturaron lo otro
      if (this.otros == '' || this.otros == null) {
        this.puedeG = true;
        console.log(`pueke ${this.puedeG}`);
      } else {
        this.puedeG = false;
      }
    }
  }
  
}
