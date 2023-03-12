import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/seguridad/user';
import { Roles } from 'src/app/model/seguridad/roles';
import { UserService } from 'src/app/services/seguridad/user.service';
import { Router } from '@angular/router';
import { CredentialRepresentation, UserRepresentation } from 'src/app/model/seguridad/seguridad';


@Component({
  selector: 'app-usuarios-nuevo',
  templateUrl: './usuarios-nuevo.component.html',
  styleUrls: ['./usuarios-nuevo.component.css']
})
export class UsuariosNuevoComponent implements OnInit {


  usuario: UserRepresentation = new UserRepresentation('','','','',[],[]);
  usuarioRoles : Roles[] = [];
  selectedValue: string = '';
  password: string = '';
  rolesSeleccionados : Roles[] = [];

  constructor(
    public dialogRef: MatDialogRef<UsuariosNuevoComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private serviceUser: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.serviceUser.getRoles().subscribe(res => {
        this.usuarioRoles = res;
        console.log(res);
      });

  }

  guardaUser() {
    let credens: CredentialRepresentation = new CredentialRepresentation();
    let roles: string[] = [];

    credens.value = this.password;
    this.usuario.credentials.push(credens);

    this.rolesSeleccionados.forEach(
     function (value) { roles.push(value.name);} 
    )
    this.usuario.realmRoles = roles;  

    this.serviceUser.create(this.usuario).subscribe(
      (res: UserRepresentation) => {
        this.openSnackBar('El usuario se ha guardado con éxito', 'ok');
        this.dialogRef.close(res);
        console.log(res);
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  consola() {
    console.log(this.usuario);
    console.log(this.rolesSeleccionados);
    console.log(this.password);
  }

}
