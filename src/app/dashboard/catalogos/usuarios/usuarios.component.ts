import { Component, OnInit } from '@angular/core';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private service: CatalogosService,
               public dialog: MatDialog,
               private router: Router ) { }

  ngOnInit(): void {

  
  }



 }
  


