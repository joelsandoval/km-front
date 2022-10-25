import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../../model/proyecto';
import { Moral, Fisica } from '../../../model/personas';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  selectedValue: string = '';
  foods: Food[] = [
    {value: '1', viewValue: 'Ambiental'},
    {value: '2', viewValue: 'Energia y social'},
    {value: '3', viewValue: 'Auditoría legal (Due Diligence)'},
    {value: '4', viewValue: 'Gestión Administrativa'},
    {value: '5', viewValue: 'Litigio Administrativo'},
  ];

  proyecto: Proyecto = new Proyecto();
  clientes: Moral[] = [
    {
      id: 1,
      nombre: 'Caminos del Norte S.A. de C.V.',
      rfc: 'jjjj',
      telefono: '444'
    },
    {
      id: 1,
      nombre: 'Caminos del Norte S.A. de C.V.',
      rfc: 'jjjj',
      telefono: '444'
    },
  ];
  

  constructor() { }

  ngOnInit(): void {
  }

}
