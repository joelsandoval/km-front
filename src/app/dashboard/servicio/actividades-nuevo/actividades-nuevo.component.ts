import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { CatActividades, CatActividadesTipo } from 'src/app/model/catalogos';
import { FisicaF } from 'src/app/model/personas';
import { Actividad, ActividadF } from 'src/app/model/proyecto';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

export interface NuevaActividad {
  origen: number;
  servicio: number;
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
  fisicas: FisicaF[] = [];
  responsable: FisicaF = new FisicaF();
  fecha: Date = new Date();
  actividad: Actividad = new Actividad();
  actividadF: ActividadF = new ActividadF();

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
        console.log(this.tipos);
        this.serviceCat.getPersonasMoral(1).subscribe(
          fisicas => this.fisicas = fisicas
        )
      }
    )
    console.log(this.data);
  }

  guardaActividad(){
    this.actividad.servicio = this.data.servicio;
    this.actividad.actividad = this.activida.id;
    this.actividad.descripcion = this.activida.actividad;
    this.actividad.tipo = this.tipo.id;
    this.actividad.fecha = this.fecha;
    this.actividad.estatus = 1;
    this.actividad.responsable = this.responsable.usuarioId;
    if(this.data.origen == 2){
      this.actividad.documento = this.data.documento
    }
    console.log(this.actividad);

    this.serviceProy.saveActividadServicio(this.actividad).subscribe(
      acti => {
        //this.actividadF = acti;
        this.dialogRef.close(acti);
        //console.log(this.actividadF);
      }
    );
    
  }


}
