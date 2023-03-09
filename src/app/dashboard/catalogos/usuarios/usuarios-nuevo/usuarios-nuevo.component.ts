import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/user';
import { Roles } from 'src/app//model/roles';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios-nuevo',
  templateUrl: './usuarios-nuevo.component.html',
  styleUrls: ['./usuarios-nuevo.component.css']
})
export class UsuariosNuevoComponent implements OnInit {


  usuario: User = new User();
  usuarioRoles : Roles[] = [];
  selectedValue: string = '';


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
    this.usuario.username = this.usuario.username;
    this.usuario.firstName = this.usuario.firstName;
    this.usuario.lastName = this.usuario.lastName;
    this.usuario.email = this.usuario.email;
    this.usuario.password = this.usuario.password;
    this.serviceUser.create(this.usuario).subscribe(
      res => {
        this.openSnackBar('El usuario se ha guardado con éxito', 'ok');
        this.router.navigate(['../usuarios']);
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}
