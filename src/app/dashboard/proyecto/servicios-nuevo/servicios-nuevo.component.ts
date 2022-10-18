import { Component, OnInit } from '@angular/core';

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

  selectedValue: string = '';
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'MIA-Particular'},
    {value: 'pizza-1', viewValue: 'MIA-Regional'},
    {value: 'tacos-2', viewValue: 'Informe Preventivo'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
