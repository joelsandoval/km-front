import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AsignacionF, Fisica, FisicaF, ProyectosEquipo, Roles } from 'src/app/model/personas';
import { ProyectoEquipo } from 'src/app/model/proyecto';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ProyectosService } from 'src/app/services/proyectos.service';


@Component({
  selector: 'app-equipo-nuevo',
  templateUrl: './equipo-nuevo.component.html',
  styleUrls: ['./equipo-nuevo.component.css']
})
export class EquipoNuevoComponent implements OnInit {

  personas: Fisica[] = [];
  persona: Fisica = new Fisica();

  constructor(
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<EquipoNuevoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private catService: CatalogosService,
    private servicioP: ProyectosService
  ) { }

  ngOnInit(): void {

    this.catService.getTodos().subscribe(
      perss => {
        this.personas = perss;
        console.log(this.personas);
      }
    )

  }

  asignaPersona(per: Fisica) {
    this.persona = per;
  }

  guardaNuevo() {
    console.log(this.data);
    let nuevo: ProyectoEquipo = new ProyectoEquipo();
    nuevo.persona = this.persona.id;
    nuevo.proyecto = this.data;
    nuevo.fechaRegistro = new Date();
    this.servicioP.saveProyectoEquipo(nuevo).subscribe(
      result => {
        this.dialogRef.close(result);
      }
    )
    
  }

  cierra() {
    this.dialogRef.close();
  }

}
