import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CatActividades, CatActividadesTipo } from 'src/app/model/catalogos';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ActividadesDelComponent } from './actividades-del/actividades-del.component';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  categorias: CatActividadesTipo[] = [];

  nueva: CatActividadesTipo = new CatActividadesTipo();
  seleccionada: CatActividadesTipo = new CatActividadesTipo();
  nuevaBool: boolean = false;

  nuevo: CatActividades = new CatActividades();
  seleccionado: CatActividades = new CatActividades();
  nuevoBool: boolean = false;

  constructor(
    private serviceCat: CatalogosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.serviceCat.getActividadesTipo().subscribe(
      categos => {
        this.categorias = categos;
      }
    )
  }

  nuevaCatego() {
    this.nuevaBool = true;
  }

  nuevoCompromiso() {
    this.nuevoBool = true;
  }

  cancelCatego() {
    this.nuevaBool = false;
  }

  cancelCompromiso() {
    this.nuevoBool = false;
  }

  guardaCatego() {
    this.serviceCat.updActividadTipo(this.nueva).subscribe(
      cate => {
        if (cate) {
          this.categorias.push(cate);
          this.nuevaBool = false;
        }
      }
    )
  }

  selectCatego(value: CatActividadesTipo) {
    this.seleccionada = value;
    this.seleccionado = new CatActividades();
    this.nuevo.tipo = value.id;
  }

  borraCatego(catego: CatActividadesTipo) {
    const dialogRef = this.dialog.open(ActividadesDelComponent, {
      height: '250px',
      width: '450px',
      data: {
        tipo: 1,
        id: catego.id,
        descripcion: catego.actividadTipo
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index: number = this.categorias.indexOf(catego);
        if (index !== -1) {
          this.categorias.splice(index, 1);
        }
      }
    });
  }

  selectCompromiso(value: CatActividades) {
    this.seleccionado = value;

  }

  guardarCompromiso(value: CatActividades, tipo: number) {

    this.serviceCat.updActividad(value).subscribe(
      doc => {
        this.seleccionado = doc;
        this.nuevoBool = false;
        if (tipo == 1) {
          let catego: CatActividadesTipo = this.categorias.find(x => x.id == value.tipo)!;
          catego.actividades.push(doc);
        }
      }
    )
  }

  borraCompromiso(doc: CatActividades) {
    const dialogRef = this.dialog.open(ActividadesDelComponent, {
      height: '250px',
      width: '450px',
      data: {
        tipo: 2,
        id: doc.id,
        descripcion: doc.actividad
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      let categ: CatActividadesTipo = this.categorias.find(x => x.id == doc.tipo)!;
      console.log(categ);
      const index: number = categ.actividades.indexOf(doc);
      if (index !== -1) {
        categ.actividades.splice(index, 1);
        this.seleccionado = new CatActividades();
      }
    });
  }

}
