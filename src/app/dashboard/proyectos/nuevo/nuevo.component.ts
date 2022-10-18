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
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  proyecto: Proyecto = new Proyecto();
  clientes: Moral[] = [];
  

  constructor() { }

  ngOnInit(): void {
  }

}
