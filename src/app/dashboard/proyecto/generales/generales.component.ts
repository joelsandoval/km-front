import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProyectoF } from 'src/app/model/proyecto';
import { ServiciosNuevoComponent } from '../servicios-nuevo/servicios-nuevo.component';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {

  id!: number;
  proyecto!: ProyectoF;


  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private servicioP: ProyectosService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => {
        this.id = +param.get('id')!;
        this.servicioP.getProyecto(this.id).subscribe(
          proyecto => {
            this.proyecto = proyecto;
          }
        )
      }
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(ServiciosNuevoComponent);

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(`Dialog result: ${result}`);
      }
    );
  }

}
