import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { UserService } from 'src/app/services/seguridad/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/seguridad/user';
import { UsuariosNuevoComponent } from './usuarios-nuevo/usuarios-nuevo.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CredentialRepresentation, UserRepresentation } from 'src/app/model/seguridad/seguridad';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Roles } from 'src/app/model/seguridad/roles';

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
  hidePassword = true;
  hideConfirmPassword = true;
  changePass = false;
  itemRoles: Roles[] = [];
  itemResult: Roles[] = [];
  rolesUsuario: any;
  rolesDisponibles: Roles[] = [];
  rolesSeleccionados: Roles[] = [];
  visible = false;
  enable = false;
  itemUser: string[] = [];
  itemRols: string[] = [];
  itemRolsFilt: string[] = [];


  seleccionado: UserRepresentation = new UserRepresentation('', '', '', '', [], []);
  dataSource!: MatTableDataSource<User>;
  pageSize = 50;
  durationInSeconds = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: UserService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.service.getUsers().subscribe(
      res => {
        this.usuarios = res;
      });
  }

  reloadURL(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route,
    });
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
    this.seleccionado.credentials = [];
    this.seleccionado.credentials.push(credens);

    this.service.updateUserCreds(usuario).subscribe(
      proy => {
        this.router.navigate(['../']);
      }
    )
  }

  addUserRol(userId: string, rolName: string){

    this.service.addRolUser(userId, rolName).subscribe(
      proy => {
        this.router.navigate(['../']);
      },
    (error: any) => {
        console.log(error)
    }
    )
  }

  delUserRol(userId: string, rolName: string){

    this.service.delRolUser(userId, rolName).subscribe(
      proy => {
        this.router.navigate(['./']);
      },
    (error: any) => {
        console.log(error)
    }
    )
  }

  editUserRoles(value: UserRepresentation) {

    this.itemUser = [];
    this.itemRols = [];
    this.itemRolsFilt = [];


    this.service.getRolsUser(value).subscribe(rus => {
      this.itemUser = [];
      this.rolesUsuario = rus;
      this.pushItems(rus, this.itemUser);
      //console.log(this.itemUser[0])

    }
    );

    this.service.getRoles().subscribe(rdis => {
      this.itemRols = [];
      this.itemRolsFilt = [];
      this.itemRoles = rdis;
      //this.pushItems(rdis, this.itemRols);
      //this.itemRolsFilt = this.itemRols.filter(x => !this.itemUser.includes(x) && x.includes('app'));


    }
    );

  }


  pushItems(obj: Object, arr: string[]) {

    Object.values(obj).forEach(val => {
      arr.push(val.name);
    });
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

  openSnackBar(msg: string) {

    this._snackBar.open(msg, "", {
      duration: 2500,
      horizontalPosition: "start",
      verticalPosition: "top",
    });

  }



  //snackBarRef = inject(MatSnackBarRef);


}

