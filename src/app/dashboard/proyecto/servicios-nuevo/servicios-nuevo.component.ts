import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria, Servicios } from 'src/app/model/catalogos';
import { Servicio } from 'src/app/model/proyecto';
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
        console.log('se encontro esto, después de guardar: '); 
        console.log(servi); 
        this.dialogRef.close(servi);        
      }
    )
  }

  cancelClick() {
    this.dialogRef.close();
  }

}
