import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Categoria, CatServicio, Servicios } from 'src/app/model/catalogos';
import { Servicio, ServicioF } from 'src/app/model/proyecto';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ProySer } from '../servicios/servicios.component';


@Component({
  selector: 'app-servicios-nuevo',
  templateUrl: './servicios-nuevo.component.html',
  styleUrls: ['./servicios-nuevo.component.css']
})
export class ServiciosNuevoComponent implements OnInit {

  categorias: Categoria[] = [];
  categoria: Categoria = new Categoria();
  catServicio: Servicios = new Servicios();
  servicio: Servicio = new Servicio();

  selectedValue: string = '';
  

  constructor(
    public dialogRef: MatDialogRef<ServiciosNuevoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProySer,
    private serviceCatalogo: CatalogosService,
    private service: ProyectosService
  ) { }

  ngOnInit(): void {
    this.serviceCatalogo.getServiciosCategorias().subscribe(
      categos => {
        this.categorias = categos;
      }
    )

  }

  guardaServicio() {
    this.servicio.proyecto = this.data.proyecto;
    this.servicio.registro = new Date();
    this.servicio.estatus = 1;
    this.service.saveProyectoServicio(this.servicio).subscribe(
      servi => {
        this.dialogRef.close(servi);
        console.log(servi);
      }
    )
  }

  cancelClick() {
    this.dialogRef.close();
  }

}
