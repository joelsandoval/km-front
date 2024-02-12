import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Archivo, ArchivosActividades } from 'src/app/model/archivos';
import { ExpCatDocumentos, ExpCatDocumentosCatego, ExpedienteServicio, ExpServicioArchivos } from 'src/app/model/expediente';
import { ArchivosService } from 'src/app/services/archivos.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { NuevoDocumento } from '../documentos.component';
import { AuthService } from 'src/app/services/seguridad/auth.service';
import { SegUsuarios } from 'src/app/model/seguridad/user';

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
  descripcion: string = '';
  archivo!: string;
  otros!: string;
  agregar: boolean = true;
  puedeG: boolean = true;
  me: SegUsuarios = new SegUsuarios();

  constructor(
    public dialogRef: MatDialogRef<DocumentosAgregaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NuevoDocumento,
    private fileService: FileUploadService,
    private service: ArchivosService,
    private serviceExp: ExpedienteService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.getUsuario(this.auth.getUsername()).subscribe(
      usua => this.me = usua
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  uploadFiles() {
    let x = 0;
    Array.from(this.fileArray).forEach(
      (element: File) => {
        this.fileService.postArchivoServicio(element, this.data.cliente, this.data.proyecto, this.data.servicio).subscribe(
          (data: Archivo) => {
            data.descripcion = this.descripcion;
            data.autor = this.me.id
            console.log(data);
            this.service.updateArchivo(data).subscribe(
              (result: Archivo) => {
                let relaciona: ArchivosActividades = new ArchivosActividades();
                relaciona.archivo = result.id;
                relaciona.actividad = this.data.servicio
                relaciona.fechaRegistro = new Date();
                this.service.saveActividades(relaciona).subscribe(
                  (archi: Archivo) => {
                    if(archi) {
                      this.dialogRef.close(archi);
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
    if (files) {
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
