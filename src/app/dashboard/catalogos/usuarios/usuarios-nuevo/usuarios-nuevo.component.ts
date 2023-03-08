import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios-nuevo',
  templateUrl: './usuarios-nuevo.component.html',
  styleUrls: ['./usuarios-nuevo.component.css']
})
export class UsuariosNuevoComponent implements OnInit {

  username: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  usuario: User = new User(this.username, this.email, this.firstName, this.lastName, this.password);


  constructor(
    public dialogRef: MatDialogRef<UsuariosNuevoComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private serviceUser: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
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
