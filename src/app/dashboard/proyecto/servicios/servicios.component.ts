import { Component, Input, OnInit } from '@angular/core';
import { ServiciosNuevoComponent } from '../servicios-nuevo/servicios-nuevo.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadF, ServicioF, ServiciosVencimiento } from 'src/app/model/proyecto';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Observable } from 'rxjs';



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

  servicios: ServiciosVencimiento[] = [];
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

    if (num == 4) {
      this.ruta = '../../../../servicio';
    } else {
      this.ruta = '../../servicio';
    }

    this.servicioP.getServiciosVencimiento(this.proyecto).subscribe(
      (servs: ServiciosVencimiento[]) => {
        console.log(servs);
        this.servicios = servs;
      }
    )

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
      (result: ServicioF) => {
        console.log('cerro el dialogo');
        console.log(result);
        if (result.id > 0) {
          let serviVen: ServiciosVencimiento = new ServiciosVencimiento();
          serviVen.servicio = result
          this.servicios.push(serviVen);
          console.log(`que paso con servicios?`);
          console.log(this.servicios);
        }
      }
    );
  }

  abreServicio(seleccionado: ServicioF) {
    console.log(seleccionado);
    this.router.navigate([this.ruta, seleccionado.id], {
      queryParams: {
        servicio: btoa(JSON.stringify(seleccionado)),
      },
    });
  }

  
}
