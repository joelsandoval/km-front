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
  personas: Fisica[] = [];
  persona: Fisica = new Fisica();
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
    private serviceFile: FileUploadService
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        this.servi = JSON.parse(atob(params['servicio']));
        this.service.getProyectoActividades(this.servi.id).subscribe(
          actis => {
            this.actividades = actis;
            this.catService.getTodos().subscribe(
              perss => {
                this.personas = perss;
              }
            )
          }
        )
        this.calendario = global.calendario;
      }
    )

  }


  openDialog() {
    const dialogRef = this.dialog.open(ActividadesNuevoComponent, {
      data: {
        origen: 1,
        servicio: this.servi,
        documento: 0
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.actividades.unshift(result);
      console.log(`Dialog result:`);
      console.log(result);
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
    modificado.observaciones = '';
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

    dialogNew.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  descargaArchivo(ruta: string, tipo: string): void {
    this.serviceFile.downloadFile(ruta, tipo);
  }
}
