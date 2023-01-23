import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {AsignacionF, FisicaF, Roles } from 'src/app/model/personas';


@Component({
  selector: 'app-equipo-nuevo',
  templateUrl: './equipo-nuevo.component.html',
  styleUrls: ['./equipo-nuevo.component.css']
})
export class EquipoNuevoComponent implements OnInit {

  personas: FisicaF[] = [];
  persona: FisicaF = new FisicaF();

  constructor(
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<EquipoNuevoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AsignacionF,
  ) { }

  ngOnInit(): void {
    
    console.log(this.personas);

  }

  asignaPersona(per: FisicaF){
    this.data.persona = per;
  }

  asignaRol(rol: Roles){
    this.data.rol = rol;
  }

  guardaNuevo() {
    console.log(this.data);
    this.dialogRef.close(this.data);
  }

}
