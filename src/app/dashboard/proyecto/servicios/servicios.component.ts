import { Component, Input, OnInit } from '@angular/core';
import { ServiciosNuevoComponent } from '../servicios-nuevo/servicios-nuevo.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/model/proyecto';
import { environment } from 'src/environments/environment';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  @Input() proyecto!: number;

  servicios: Servicio[] = [];
  ruta: string = '../../servicio';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    let origen = this.router.url;
    let num = origen.split("/").length - 1;

    console.log('servicios entra');
    console.log(this.proyecto);
    this.servicios = environment.servicios.filter((ser) => ser.proyecto == this.proyecto);
    console.log(this.servicios);

    switch (num) {
      case 4:
        this.ruta = '../../../../servicio';
        break;

      default:
        this.ruta = '../../servicio';
    }
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
