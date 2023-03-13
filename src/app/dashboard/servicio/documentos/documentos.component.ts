import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Archivo } from 'src/app/model/archivos';
import { ExpedienteServicioCatF, ExpedienteServicioF } from 'src/app/model/expediente';
import { FisicaF } from 'src/app/model/personas';
import { ServicioF } from 'src/app/model/proyecto';
import { ArchivosService } from 'src/app/services/archivos.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ActividadesNuevoComponent } from '../actividades-nuevo/actividades-nuevo.component';
import { DocumentosAgregaComponent } from './documentos-agrega/documentos-agrega.component';

export interface NuevoDocumento {
  cliente: number;
  proyecto: number;
  servicio: number;
  user: number;
  catego: Categos;
  persona: number;
  origen: number;
  expediente: ExpedienteServicioF;
}

export interface Categos {
  id: number;
  categoria: string;
  catego: string;
}

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  //@Input() ;
  //@Output() documentoCambia = new EventEmitter<ExpedienteServicioF>();
  servicio: ServicioF = new ServicioF();
  documento$: Archivo[] = [];
  documento: Archivo = new Archivo(0);
  me!: number;
  permisos: string[] = [];

  expedienteCat: ExpedienteServicioCatF[] = [];

  servicioF: ServicioF = new ServicioF();

  tipo: string = '';
  catego: number = 0;
  filesNumber: number = 0;
  filesTooltip: string = '';

  seleccionado: ExpedienteServicioF = new ExpedienteServicioF();
  archivos: Archivo[] = [];

  step: number = 0;
  
  personas: FisicaF[] = [];
  persona: FisicaF = new FisicaF();

  constructor(
    private service: ArchivosService,
    private serviceP: ProyectosService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private serviceEx: ExpedienteService,
    private _bottomSheet: MatBottomSheet,
    private serviceFU: FileUploadService
  ) { }

  ngOnInit() {

    this.catego = 1;
    this.route.queryParams.subscribe(
      (params) => {
        this.servicio = JSON.parse(params['servicio']);
        this.serviceEx.getExpedienteCatServicio(this.servicio.id).subscribe(
          exp => {
            this.expedienteCat = exp;
            this.seleccionado = this.expedienteCat[0].documentos[0];
            this.service.getPorExpediente(this.seleccionado.id).subscribe(
              archis => this.archivos = archis
            )
          }
        )
      }
    )
  }


  deleteDocument(id: number): void {
    console.log(id);
  }

  nuevoDocumento(exp: ExpedienteServicioF): void {
    const me = 0; //this.auth.getUserId();
    this.documento = new Archivo(this.servicio.id);
    const dialogNew = this.dialog.open(DocumentosAgregaComponent, {
      width: '700px',
      height: '400px',
      data: {
        cliente: 1,
        proyecto: this.servicio.proyecto,
        servicio: this.servicio.servicio,
        user: me,
        catego: null,
        persona: 1,
        origen: 2,
        expediente: exp
      }
    })

    dialogNew.afterClosed().subscribe(result => {
      this.service.getPorExpediente(exp.id).subscribe(
        archis => this.archivos = archis
      )
    });
  }

  descargaTodos() {
    this.service.getPorExpedienteTT(this.servicio.id, this.catego).subscribe(
      archivos => {
        archivos.forEach(
          archivo => {
            this.descargaArchivo(archivo.ruta, archivo.archivo);
          }
        )
      }
    )

  }

  descargaArchivos(exp: ExpedienteServicioF) {
    this.service.getPorExpediente(exp.id).subscribe(
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

  borraArchivo(archi: Archivo) {
    console.log(archi);
    this.service.borraArchivo(archi).subscribe(
      se_borro => {
        //this.dataSource.data = this.dataSource.data.filter(x => x !== archi)
        console.log('borrado')
      }
    )
  }

  creaExpediente(tramite: number, estudio: number, persona: number) {
    this.serviceEx.generaExpediente(tramite, estudio, persona).subscribe(
      exp => {
        this.expedienteCat = exp;
        console.log(this.expedienteCat);
      }
    )
  }

  nuevoExpediente(): void {
    const dialogNew = this.dialog.open(DocumentosAgregaComponent, {
      width: '700px',
      height: '400px',
      data: {
        cliente: 1,
        proyecto: this.servicio.proyecto,
        servicio: this.servicio.servicio,
        user: 0,
        catego: null,
        persona: 1,
        origen: 1,
        expediente: null
      }
    })

    dialogNew.afterClosed().subscribe(result => {
      if (result) {
        this.serviceEx.getExpedienteCatServicio(this.servicio.id).subscribe(
          exp => {
            this.expedienteCat = exp;
          }
        )
      }
    });
  }

  selectExpediente(value: ExpedienteServicioF) {
    //this.documentoCambia.emit(value);
    this.seleccionado = value;
    this.service.getPorExpediente(this.seleccionado.id).subscribe(
      archis => this.archivos = archis
    )
  }

  registraActividad(valor: ExpedienteServicioF) {
    const dialogRef = this.dialog.open(ActividadesNuevoComponent, {
      data: {
        origen: 2,
        servicio: this.servicio.servicio,
        documento: this.seleccionado.id
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      /* this.actividades.unshift(result);
      console.log(`Dialog result:`);
      console.log(result); */
    });
  }

}
