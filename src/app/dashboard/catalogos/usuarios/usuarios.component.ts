import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuariosNuevoComponent } from './usuarios-nuevo/usuarios-nuevo.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: User[] = [];
  username: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';

  seleccionado: User = new User(this.username, this.email, this.firstName, this.lastName, this.password);
  dataSource!: MatTableDataSource<User>;
  pageSize = 50;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: UserService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {

    //let tipo: number = 3;
    this.service.getUsers().subscribe(
      res => {
        this.usuarios = res;
      }
    )

  }

  selectUser(value: User) {
    this.seleccionado = value;
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
      height: '400px',
      data: {
        ds: this.dataSource
      },
    });

  }

}



