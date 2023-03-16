import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/seguridad/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/model/seguridad/user';
import { UsuariosNuevoComponent } from './usuarios-nuevo/usuarios-nuevo.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserRepresentation } from 'src/app/model/seguridad/seguridad';

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
  password!: string;
  rol!: string;

  seleccionado: UserRepresentation = new UserRepresentation('', '', '', '', [], []);
  dataSource!: MatTableDataSource<User>;
  pageSize = 50;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: UserService,
    public dialog: MatDialog,
    private router: Router) { }

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

  editUser(value: UserRepresentation){
      this.service.updateUser(value).subscribe(
        proy => {
          this.router.navigate(['../usuarios']);
        }
      )
      }
   /* delUser(servi: UserService ) {
        servi.delUser;
   } */

  delUser(value: UserRepresentation){
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

  }



