import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PersonasMorales } from 'src/app/model/personas';
import { CatalogosService } from 'src/app/services/catalogos.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  clientes: PersonasMorales[] = [];
  displayedColumns: string[] = ['id','cliente'];
  dataSource!: MatTableDataSource<PersonasMorales>;
  pageSize = 50;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: CatalogosService) { }

  ngOnInit(): void {

    let tipo: number = 3;
      this.service.getListaClientes(tipo).subscribe(clis => {
        this.dataSource = new MatTableDataSource(clis);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(clis);

      });


  }

}
