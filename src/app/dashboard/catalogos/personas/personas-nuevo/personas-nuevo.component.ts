import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { PersonasMorales } from 'src/app/model/personas';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-personas-nuevo',
  templateUrl: './personas-nuevo.component.html',
  styleUrls: ['./personas-nuevo.component.css']
})
export class PersonasNuevoComponent implements OnInit {

  cliente: PersonasMorales = new PersonasMorales();


  constructor(
    public dialogRef: MatDialogRef<PersonasNuevoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private serviceCatalogo: CatalogosService,
    private _snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit() {
  }

  guardaCli(){
    this.cliente.razon = this.cliente.razon;
    this.cliente.rfc = this.cliente.rfc;
    this.cliente.nombre_corto = this.cliente.nombre_corto;
    this.cliente.principal = 1;
    this.cliente.tipo = 3;
    this.serviceCatalogo.saveCliente(this.cliente).subscribe(
      cli => { 
        this.openSnackBar('El cliente se ha guardado con éxito', 'ok');
        this.router.navigate(['../personas']);
      }
    )
  
   

 }

 openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action);
}

}
