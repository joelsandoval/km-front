import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { UserService } from 'src/app/services/seguridad/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/model/seguridad/user';
import { UsuariosNuevoComponent } from './usuarios-nuevo/usuarios-nuevo.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CredentialRepresentation, UserRepresentation } from 'src/app/model/seguridad/seguridad';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: UserRepresentation[] = [];
  username!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  password: string = '';
  confirmPassword: string = '';

  rol!: string;



  seleccionado: UserRepresentation = new UserRepresentation('', '', '', '', [], []);
  dataSource!: MatTableDataSource<User>;
  pageSize = 50;
  durationInSeconds = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: UserService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {

    this.service.getUsers().subscribe(
      res => {
        this.usuarios = res;
      }
    )

  }

  selectUser(value: UserRepresentation) {
    this.seleccionado = value;
  }

  editUser(value: UserRepresentation) {
    this.service.updateUser(value).subscribe(
      proy => {
        this.router.navigate(['./']);
      }
    )
  }

  editUserCreds(usuario: UserRepresentation) {
    usuario = this.seleccionado
    let credens: CredentialRepresentation = new CredentialRepresentation();
    credens.value = this.password;
    //usuario.credentials.push(credens)
    //usuario.credentials[0] =credens;

    //this.seleccionado.credentials.pop();
    //this.seleccionado.credentials.length=0;
    this.seleccionado.credentials = [];
    this.seleccionado.credentials.push(credens);

    this.service.updateUserCreds(usuario).subscribe(
      proy => {
        this.router.navigate(['./']);
      }
    )
  }


  delUser(value: UserRepresentation) {
    this.service.delUser(value).subscribe(
      proy => {
        this.router.navigate(['../usuarios']);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(UsuariosNuevoComponent, {
      width: '700px',
      height: '600px',
      data: {
        ds: this.dataSource
      },
    });



    dialogRef.afterClosed().subscribe((result: UserRepresentation) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.usuarios.push(result);
      };
    });




  }

  changePasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  hidePassword = true;
  hideConfirmPassword = true;
  changePass = false;

  toggleHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  toggleHideConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  submit() {
    if (this.password == this.confirmPassword) {
      this.changePass = true;
    } else {
      this.changePass = false;
    }
  }

  openSnackBar() {

  this._snackBar.open("Contraseña actualizada correctamente", "", {
  duration: 2500,
  horizontalPosition: "start",
  verticalPosition: "top",
});

  }



  //snackBarRef = inject(MatSnackBarRef);


}

