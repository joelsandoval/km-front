import { Component, OnInit } from '@angular/core';
import { Categoria, CatServicio, SubCategoria } from 'src/app/model/catalogos';
import * as global from '../../../model/global'

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-servicios-nuevo',
  templateUrl: './servicios-nuevo.component.html',
  styleUrls: ['./servicios-nuevo.component.css']
})
export class ServiciosNuevoComponent implements OnInit {

  categorias: Categoria[] = [];
  categoria: Categoria = new Categoria();
  subcategoria: SubCategoria = new SubCategoria();
  servicio: CatServicio = new CatServicio();


  selectedValue: string = '';
  foods: Food[] = [
    {value: '1', viewValue: 'MIA-Particular'},
    {value: '2', viewValue: 'MIA-Regional'},
    {value: '3', viewValue: 'Informe Preventivo'},
  ];

  constructor() { }

  ngOnInit(): void {
    this.categorias = global.CAT_SERVICIOS;
  }

}
