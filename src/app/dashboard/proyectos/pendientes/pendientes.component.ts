import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadF, ServicioF, VwActividades } from 'src/app/model/proyecto';
import { Credenciales } from 'src/app/model/seguridad/seguridad';
import { SegUsuarios } from 'src/app/model/seguridad/user';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { AuthService } from 'src/app/services/seguridad/auth.service';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent implements OnInit {
  usuario: SegUsuarios = new SegUsuarios();
  displayedColumns: string[] = ['actividad', 'vencimiento', 'responsable', 'proyecto', 'servicio'];
  dataSource!: MatTableDataSource<VwActividades>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private auth: AuthService,
    private servicio: ProyectosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let cred: Credenciales = this.auth.getCredenciales();
    this.auth.getUsuario(cred.nombre).subscribe(
      user => {
        this.usuario = user
        this.servicio.getActividadesPendientes(this.usuario.id).subscribe(
          pendientes => {
            this.dataSource = new MatTableDataSource(pendientes);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        )
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

  abreServicio(servi: number) {
    this.servicio.getProyectoServicio(servi).subscribe(
      (resulta: ServicioF) => {
        this.router.navigate(['../../servicio', servi], {
          relativeTo: this.route,
          queryParams: {
            servicio: btoa(JSON.stringify(resulta)),
          },
        });
      }
    )
  }

}
