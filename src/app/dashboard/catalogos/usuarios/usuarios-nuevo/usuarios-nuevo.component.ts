import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonasMorales } from 'src/app/model/personas';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios-nuevo',
  templateUrl: './usuarios-nuevo.component.html',
  styleUrls: ['./usuarios-nuevo.component.css']
})
export class UsuariosNuevoComponent implements OnInit {

  cliente: PersonasMorales = new PersonasMorales();


  constructor(
    public dialogRef: MatDialogRef<UsuariosNuevoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private serviceCatalogo: CatalogosService,
    private _snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit() {
  }

 

}
