import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProyectoF } from '../../../model/proyecto';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  proyectos: ProyectoF[] = [];
  displayedColumns: string[] = ['acciones', 'id', 'fecha', 'nombre', 'cliente', 'sector'];
  dataSource!: MatTableDataSource<ProyectoF>;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioP: ProyectosService
  ) {

  }

  ngOnInit(): void {
    this.servicioP.getProyectosActivos().subscribe(
      proys => {
        this.dataSource = new MatTableDataSource(proys);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(proys);
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

}
