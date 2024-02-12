import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SegUsuarios, User } from 'src/app/model/seguridad/user';
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
        this.usuarioRoles = res.filter(x => x.name.includes('app'));
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
    console.log(this.usuario);  
    this.serviceUser.create(this.usuario).subscribe(
      (res: UserRepresentation) => {
        let nuevo: SegUsuarios = new SegUsuarios();
        nuevo.usuario = this.usuario.username;
        nuevo.nombre = this.usuario.firstName;
        nuevo.apellidos = this.usuario.lastName;
        nuevo.email = this.usuario.email;
        nuevo.estatus = 1;
        nuevo.fechaAlta = new Date();
        this.serviceUser.createUsuario(nuevo).subscribe(
          (user: SegUsuarios) => {
            this.openSnackBar(`El usuario ${user.usuario} se ha guardado con éxito`, 'Ok');
            this.dialogRef.close(res);
          }
        )
        
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
