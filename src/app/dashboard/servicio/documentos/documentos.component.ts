import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { Archivo } from 'src/app/model/archivos';
import { ExpedienteServicioCatF, ExpedienteServicioF } from 'src/app/model/expediente';
import { FisicaF } from 'src/app/model/personas';
import { DataServicio, ServicioF } from 'src/app/model/proyecto';
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
  @Input() data!: DataServicio;
  @Output() documentoCambia = new EventEmitter<ExpedienteServicioF>();

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
    this.serviceP.getProyectoServicio(this.data.servicio).subscribe(
      servi => {
        this.servicioF = servi;
        this.serviceEx.getExpedienteCatServicio(this.data.servicio).subscribe(
          exp => {
            this.expedienteCat = exp;
            this.seleccionado = this.expedienteCat[0].documentos[0];
            //this.filesNumber = this.expedienteCat.reduce((sum, current) => sum + current.archivos, 0);
            //this.filesTooltip = `Descargar ${this.filesNumber} archivos`;
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
    this.documento = new Archivo(this.data.servicio);
    const dialogNew = this.dialog.open(DocumentosAgregaComponent, {
      width: '700px',
      height: '350px',
      data: {
        cliente: this.data.cliente,
        proyecto: this.data.proyecto,
        servicio: this.data.servicio,
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
    this.service.getPorExpedienteTT(this.data.servicio, this.catego).subscribe(
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
      height: '350px',
      data: {
        cliente: this.data.cliente,
        proyecto: this.data.proyecto,
        servicio: this.data.servicio,
        user: 0,
        catego: null,
        persona: 1,
        origen: 1,
        expediente: null
      }
    })

    dialogNew.afterClosed().subscribe(result => {
      if (result) {
        this.serviceEx.getExpedienteCatServicio(this.data.servicio).subscribe(
          exp => {
            this.expedienteCat = exp;
          }
        )
      }
    });
  }

  selectExpediente(value: ExpedienteServicioF) {
    this.documentoCambia.emit(value);
    this.seleccionado = value;
    this.service.getPorExpediente(this.seleccionado.id).subscribe(
      archis => this.archivos = archis
    )
  }

  registraActividad(valor: ExpedienteServicioF) {
    const dialogRef = this.dialog.open(ActividadesNuevoComponent, {
      data: {
        origen: 2,
        servicio: this.data.servicio,
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
