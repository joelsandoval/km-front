import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Categoria, ExpCatDocumentosServicios, Servicios } from 'src/app/model/catalogos';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ServiciosDelComponent } from './servicios-del/servicios-del.component';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  categorias: Categoria[] = [];

  nueva: Categoria = new Categoria();
  seleccionada: Categoria = new Categoria();
  nuevaBool: boolean = false;

  nuevo: Servicios = new Servicios();
  seleccionado: Servicios = new Servicios();
  nuevoBool: boolean = false;

  documentos: ExpCatDocumentosServicios[] = [];
  
  constructor(
    private serviceCatalogo: CatalogosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.serviceCatalogo.getServiciosCategorias().subscribe(
      categos => {
        this.categorias = categos;
      }
    )

  }

  selectCatego(value: Categoria) {
    this.seleccionada = value;
    this.seleccionado = new Servicios();
    this.nuevo.categoria = this.seleccionada.id;
  }

  selectServicio(value: Servicios) {
    this.seleccionado = value;
    this.serviceCatalogo.getExpDocsServicio(value.id).subscribe(
      docs => {
        this.documentos = docs;
      }
    )
  }

  guardarServicio(value: Servicios, tipo: number) {
    this.serviceCatalogo.updServicio(value).subscribe(
      servi => {
        this.seleccionado = servi;
        this.nuevoBool = false;

        if (tipo == 1) {
          let catego: Categoria = this.categorias.find(x => x.id == value.categoria)!;
          catego.servicios.push(servi);
        }
        
      }
    )
  }

  nuevaCatego() {
    this.nuevaBool = true;
  }

  nuevoServicio() {
    this.nuevoBool = true;
  }

  cancelCatego() {
    this.nuevaBool = false;
  }

  cancelServicio() {
    this.nuevoBool = false;
  }

  guardaCatego() {
    this.serviceCatalogo.updCategoria(this.nueva).subscribe(
      cate => {
        if (cate) {
          this.categorias.push(cate);
          this.nuevaBool = false;
        }
      }
    )
  }

  borraCatego(catego: Categoria) {
    const dialogRef = this.dialog.open(ServiciosDelComponent, {
      height: '250px',
      width: '400px',
      data: {
        tipo: 1,
        id: catego.id,
        descripcion: catego.categoria
      },
    });

    dialogRef.afterClosed().subscribe(result => { 
      const index: number = this.categorias.indexOf(catego);
        if (index !== -1) {
          this.categorias.splice(index, 1);
        }
    });
  }

  borraServicio(servi: Servicios) {
    const dialogRef = this.dialog.open(ServiciosDelComponent, {
      height: '250px',
      width: '400px',
      data: {
        tipo: 2,
        id: servi.id,
        descripcion: servi.servicio
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      let categ: Categoria = this.categorias.find(x => x.id == servi.categoria)!; 
      console.log(categ);
      const index: number = categ.servicios.indexOf(servi);
        if (index !== -1) {
          categ.servicios.splice(index, 1);
          this.seleccionado = new Servicios();
        }
    });
  }
}
