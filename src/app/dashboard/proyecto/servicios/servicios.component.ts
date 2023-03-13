import { Component, Input, OnInit } from '@angular/core';
import { ServiciosNuevoComponent } from '../servicios-nuevo/servicios-nuevo.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio, ServicioF } from 'src/app/model/proyecto';
import { ProyectosService } from 'src/app/services/proyectos.service';



export interface ProySer {
  proyecto: number;
}

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  @Input() proyecto!: number;

  servicios: ServicioF[] = [];
  ruta: string = '../../servicio';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private servicioP: ProyectosService
  ) {

  }

  ngOnInit(): void {
    let origen = this.router.url;
    let num = origen.split("/").length - 1;

    this.servicioP.getProyectoServicios(this.proyecto).subscribe(
      servs => {
        this.servicios = servs;
      }
    )


    switch (num) {
      case 4:
        this.ruta = '../../../../servicio';
        break;

      default:
        this.ruta = '../../servicio';
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ServiciosNuevoComponent, {
      width: '700px',
      height: '400px',
      data: {
        proyecto: this.proyecto,
      },
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          this.servicios.push(result);
          console.log(`Dialog result: ${result}`);
        }
      }
    );
  }

  abreServicio(seleccionado: ServicioF){
    console.log(seleccionado);
    this.router.navigate([this.ruta, seleccionado.id], {
      queryParams: {
        servicio: btoa(JSON.stringify(seleccionado)),
      },
    });
  }


}
