import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Actividad, ActividadF, Calendario, ServicioF } from 'src/app/model/proyecto';
import * as global from 'src/app/model/global'
import { MatDialog } from '@angular/material/dialog';
import { ActividadesNuevoComponent } from '../actividades-nuevo/actividades-nuevo.component';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Fisica, FisicaF } from 'src/app/model/personas';
import { ActivatedRoute } from '@angular/router';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { DocumentosAgregaComponent } from '../documentos/documentos-agrega/documentos-agrega.component';
import { Archivo } from 'src/app/model/archivos';
import { ArchivosService } from 'src/app/services/archivos.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { SegUsuarios } from 'src/app/model/seguridad/user';
import { BorraConfirmaComponent } from '../../proyecto/borra-confirma/borra-confirma.component';
import { AuthService } from 'src/app/services/seguridad/auth.service';
import { Credenciales } from 'src/app/model/seguridad/seguridad';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  @Input() servicio!: number;
  @Output() actividadCambia = new EventEmitter<ActividadF>();

  calendario: Calendario[] = [];
  actividades: ActividadF[] = [];
  seleccionado: ActividadF = new ActividadF();
  personas: SegUsuarios[] = [];
  persona: SegUsuarios = new SegUsuarios();
  me: SegUsuarios = new SegUsuarios();
  folders = global.folders;
  notes = global.notes;
  servi: ServicioF = new ServicioF();
  documento: Archivo = new Archivo(0);
  documentos: Archivo[] = [];

  constructor(
    public dialog: MatDialog,
    private service: ProyectosService,
    private route: ActivatedRoute,
    private catService: CatalogosService,
    private serviceA: ArchivosService,
    private serviceFile: FileUploadService,
    private auth: AuthService
  ) { }


  ngOnInit(): void {

    this.route.params.subscribe(
      (params) => {
        console.log('params');
        console.log(params);
        let service: number = params['servi'];
        this.service.getProyectoServicio(service).subscribe(
          (resulta: ServicioF) => {
            this.servi = resulta;
            this.service.getProyectoActividades(service).subscribe(
              actis => {
                this.actividades = actis;
                console.log('actividades')
                console.log(this.actividades)
                this.catService.getTodos().subscribe(
                  perss => {
                    this.personas = perss;
                    let cred: Credenciales = this.auth.getCredenciales();
                    this.auth.getUsuario(cred.nombre).subscribe(
                      (user: SegUsuarios) => {
                        this.me = user
                      })
                  }
                )
              }
            )
          }
        )
      }
    )

  }


  openDialog() {
    const dialogRef = this.dialog.open(ActividadesNuevoComponent, {
      width: '550px',
      height: '410px',
      data: {
        origen: 1,
        servicio: this.servi,
        documento: 0
      }
    });

    dialogRef.afterClosed().subscribe((result: ActividadF) => {
      if (result) {
        this.actividades.unshift(result);
      }
    });
  }


  paraVer(): void {
    // get a reference to your table by id
    // cast this to HTMLTableElement in TypeScript
    const table: HTMLTableElement | null = document.querySelector('#tblServicios');

    // get all rows in the first table body
    const rows = table!.tBodies[0].rows;

    // convert the rows to an array with the spread operator (...)
    // then iterate over each row using forEach
    Array.from(rows).forEach((row: any, idx) => {
      // attach a click handler on each row
      row.addEventListener('click', (_event: any) => {
        // get all cells in the row, convert them to an array with the spread operator (...)
        // then for each cell, return its textContent by mapping on the array
        const tds = Array.from(row.cells).map((td: any) => td.textContent);

        console.clear();
        // Log the row index
        console.log('row index:', idx);
        // Log the tds content array
        console.log('tds content:', ...tds);
        // join the contents of the tds with a space and display the string
        console.log('tds string:', tds.join(' '));
      });
    });
  }

  selectActividad(value: ActividadF) {
    this.actividadCambia.emit(value);
    let vencim: Date = new Date(value.vencimiento);
    this.seleccionado = value;
    this.seleccionado.vencimiento = vencim
    this.persona = this.personas.find(x => x.id == this.seleccionado.responsableId)!;
    console.log(this.seleccionado)
    this.serviceA.getDocumentosActividad(this.seleccionado.id).subscribe(
      (docs: Archivo[]) => {
        this.documentos = docs;
      }
    )

  }

  delete(actividad: ActividadF, ev: any) {
    this.service.delActividadServicio(actividad.id).subscribe(
      nada => console.log('se borro')
    )

  }

  guardaActividad() {
    let modificado: Actividad = new Actividad();
    modificado.id = this.seleccionado.id;
    modificado.actividad = this.seleccionado.actividadId;
    modificado.descripcion = this.seleccionado.descripcion;
    modificado.documento = 0;
    modificado.estatus = this.seleccionado.estatusId;
    modificado.fecha = this.seleccionado.fecha;
    modificado.observaciones = this.seleccionado.observaciones;
    modificado.responsable = this.seleccionado.responsableId;
    modificado.servicio = this.seleccionado.servicio;
    modificado.terminado = this.seleccionado.terminado;
    modificado.tipo = this.seleccionado.tipoId;
    modificado.vencimiento = this.seleccionado.vencimiento;

    this.service.saveActividadServicio(modificado).subscribe(
      acti => {
        this.seleccionado = acti;
      }
    );

  }


  nuevoDocumento(): void {
    const me = 0;
    const dialogNew = this.dialog.open(DocumentosAgregaComponent, {
      width: '700px',
      height: '400px',
      data: {
        cliente: 1,
        proyecto: this.servi.proyecto,
        servicio: this.seleccionado.id,
        user: me,
        catego: null,
        persona: 1,
        origen: 2,
        expediente: null
      }
    })

    dialogNew.afterClosed().subscribe((archi: Archivo) => {
      if (archi) {
        this.documentos.push(archi);
      }
    });
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
        let index = this.documentos.findIndex(x => x.id === archivo.id);
        this.documentos.splice(index, 1);
      }
    );

  }
}
