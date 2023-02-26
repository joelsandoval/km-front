import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Archivo } from 'src/app/model/archivos';
import { ExpCatDocumentos, ExpCatDocumentosCatego, ExpedienteServicio, ExpServicioArchivos } from 'src/app/model/expediente';
import { ArchivosService } from 'src/app/services/archivos.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { NuevoDocumento } from '../documentos.component';

@Component({
  selector: 'app-documentos-agrega',
  templateUrl: './documentos-agrega.component.html',
  styleUrls: ['./documentos-agrega.component.css']
})
export class DocumentosAgregaComponent implements OnInit {

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
    public dialogRef: MatDialogRef<DocumentosAgregaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NuevoDocumento,
    private fileService: FileUploadService,
    private service: ArchivosService,
    private serviceExp: ExpedienteService
  ) { }

  ngOnInit(): void {
    this.serviceExp.getExpedienteCatDocsCatego().subscribe(
      cat => {
        this.categorias = cat;
        /* this.serviceExp.getExpCatDocumentos(this.data.catego.id, this.data.persona, this.data.proyecto).subscribe(
          lista => {
            this.tipos = lista; */
            if (this.data.origen == 1) {
              this.expediente.servicio = this.data.servicio;
              this.expediente.cumple = false;
              this.expediente.presenta = true;
            }
    
          /* }
        ) */
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  uploadFiles() {
    let x = 0;
    Array.from(this.fileArray).forEach(
      element => {
        this.fileService.postArchivoServicio(element, this.data.cliente, this.data.proyecto, this.data.servicio).subscribe(
          (data: Archivo) => {
            data.descripcion = this.expediente.comentarios;
            data.tipo = 100;
            data.estatus = 1;
            data.fecha = new Date();
            data.autor = this.data.user;
            console.log(data);
            this.service.updateArchivo(data).subscribe(
              (result: Archivo) => {
                let exparch: ExpServicioArchivos = new ExpServicioArchivos();
                exparch.expediente = this.data.expediente.id;
                exparch.archivo = result.id;
                this.serviceExp.saveExpTramiteArchivo(exparch).subscribe(
                  ne => {
                    x++;
                    if (x == this.fileArray.length) {
                      this.dialogRef.close(`${x} archivos cargados`);
                    }
                  }
                )
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

  guardarDocumento(): void {
    if (this.catego == 0) {
      if (this.agregar) {
        let nuevoEx: ExpCatDocumentos = new ExpCatDocumentos();
        nuevoEx.documento = this.otros;
        nuevoEx.descripcion = this.otros;
        nuevoEx.orden = 0;
        nuevoEx.persona = 3;
        nuevoEx.tipo = this.data.catego.id;
        this.serviceExp.saveExpCatDocumento(nuevoEx).subscribe(
          resulta => {
            let nuevoEt: ExpedienteServicio = new ExpedienteServicio();
            this.expediente.documento = resulta.id
            this.serviceExp.saveExpediente(this.expediente).subscribe(
              result => {
                this.dialogRef.close(result);
              }
            )
          }
        )
      } else {
        this.expediente.documento = 7
        this.serviceExp.saveExpediente(this.expediente).subscribe(
          result => {
            this.dialogRef.close(result);
          }
        )
      }
    } else {
      this.expediente.documento = this.catego;
      this.serviceExp.saveExpediente(this.expediente).subscribe(
        result => {
          this.dialogRef.close(result);
        }
      )
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
