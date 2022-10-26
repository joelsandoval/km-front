import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-actividades-nuevo',
  templateUrl: './actividades-nuevo.component.html',
  styleUrls: ['./actividades-nuevo.component.css']
})
export class ActividadesNuevoComponent implements OnInit {

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number
    ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
