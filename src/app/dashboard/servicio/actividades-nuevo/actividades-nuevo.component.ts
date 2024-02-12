import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatActividades, CatActividadesTipo } from 'src/app/model/catalogos';
import { Actividad, ActividadF, ServicioF } from 'src/app/model/proyecto';
import { SegUsuarios } from 'src/app/model/seguridad/user';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

export interface NuevaActividad {
  origen: number;
  servicio: ServicioF;
  documento: number;
}


@Component({
  selector: 'app-actividades-nuevo',
  templateUrl: './actividades-nuevo.component.html',
  styleUrls: ['./actividades-nuevo.component.css']
})
export class ActividadesNuevoComponent implements OnInit {

  tipos: CatActividadesTipo[] = [];
  tipo: CatActividadesTipo = new CatActividadesTipo();
  activida: CatActividades = new CatActividades();
  fisicas: SegUsuarios[] = [];
  responsable: SegUsuarios = new SegUsuarios();
  fecha: Date = new Date();
  actividad: Actividad = new Actividad();
  actividadF: ActividadF = new ActividadF();

  valCompromiso: boolean = false;
  valVencimiento: boolean = false;
  valResponsable: boolean = false;
  valGuarda: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ActividadesNuevoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NuevaActividad,
    private serviceCat: CatalogosService,
    private serviceProy: ProyectosService
  ) { }

  ngOnInit(): void {
    this.serviceCat.getActividadesTipo().subscribe(
      categos => {
        this.tipos = categos;
        this.serviceProy.getEquipo(this.data.servicio.proyecto).subscribe(
          fisicas => this.fisicas = fisicas
        )
      }
    )
  }

  guardaActividad() {
    this.actividad.servicio = this.data.servicio.id;
    this.actividad.actividad = 0;
    this.actividad.tipo = 1;
    this.actividad.fecha = new Date();
    this.actividad.estatus = 1;
    this.actividad.documento = 0;
    this.actividad.terminado = false;
    console.log('actividad nueva');
    console.log(this.actividad);

    this.serviceProy.saveActividadServicio(this.actividad).subscribe(
      (acti: ActividadF) => {
        this.actividadF = acti;
        this.dialogRef.close(acti);
      }
    );

  }

  puedeGuardar() {
    if (this.actividad.descripcion != '') {
      this.valCompromiso = true
    } else {
      this.valCompromiso = false
    }

    if (this.actividad.vencimiento != null) {
      this.valVencimiento = true
    } else {
      this.valVencimiento = false
    }

    if (this.actividad.responsable != null) {
      this.valResponsable = true
    } else {
      this.valResponsable = false
    }

    this.valGuarda = this.valCompromiso && this.valVencimiento && this.valResponsable
  }

}
