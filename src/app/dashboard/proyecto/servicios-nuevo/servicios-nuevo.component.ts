import { Component, OnInit } from '@angular/core';
import { Categoria, CatServicio, Servicios } from 'src/app/model/catalogos';
import { CatalogosService } from 'src/app/services/catalogos.service';


@Component({
  selector: 'app-servicios-nuevo',
  templateUrl: './servicios-nuevo.component.html',
  styleUrls: ['./servicios-nuevo.component.css']
})
export class ServiciosNuevoComponent implements OnInit {

  categorias: Categoria[] = [];
  categoria: Categoria = new Categoria();
  servicios: Servicios = new Servicios();
  servicio: CatServicio = new CatServicio();


  selectedValue: string = '';
  

  constructor(
    private serviceCatalogo: CatalogosService
  ) { }

  ngOnInit(): void {
    this.serviceCatalogo.getServiciosCategorias().subscribe(
      categos => this.categorias = categos
    )

  }

}
