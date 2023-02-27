import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PersonasMorales } from 'src/app/model/personas';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PersonasNuevoComponent } from './personas-nuevo/personas-nuevo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  clientes: PersonasMorales[] = [];
  seleccionado: PersonasMorales = new PersonasMorales();
  displayedColumns: string[] = ['id','cliente'];
  dataSource!: MatTableDataSource<PersonasMorales>;
  pageSize = 50;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: CatalogosService,
               public dialog: MatDialog,
               private router: Router ) { }

  ngOnInit(): void {

    let tipo: number = 3;
    this.service.getListaClientes(tipo).subscribe(
      clis => {
        this.clientes = clis;
      }
    )

    /*
      this.service.getListaClientes(tipo).subscribe(clis => {
        this.dataSource = new MatTableDataSource(clis);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(clis);

      });

   */
  }

  selectCliente(value: PersonasMorales) {
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
    const dialogRef = this.dialog.open(PersonasNuevoComponent, {
      width: '700px',
      height: '400px',
      data: {
        proyecto: this.dataSource,
      },
    });

    /*dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          this.servicios.push(result);
          console.log(`Dialog result: ${result}`);
        }
      }
    ); */
  }

  guardaCli(value: PersonasMorales ){
    this.service.updCliente(value).subscribe(
      proy => { 
       /* this.openSnackBar('El cliente se ha guardado con éxito', 'ok'); */
        this.router.navigate(['../personas']);
      }
    )
  
 }
    
  
   

 }
  


