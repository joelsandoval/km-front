import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { environment } from 'src/environments/environment';
import { ServiciosNuevoComponent } from '../servicios-nuevo/servicios-nuevo.component';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {
  
  id!: number;
  proyectos: Proyecto[] = [];
  proyecto!: Proyecto;


  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => {
        this.id = +param.get('id')!;
        this.proyectos = environment.proyectos;
        this.proyecto = this.proyectos.filter((proy) => proy.id == this.id)[0];
        console.log('generales');
        console.log(this.proyecto);
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
