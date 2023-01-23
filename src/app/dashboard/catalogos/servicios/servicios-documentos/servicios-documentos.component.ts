import { Component, Input, OnInit } from '@angular/core';
import { ExpCatDocumentosServicios, Servicios } from 'src/app/model/catalogos';
import { Servicio } from 'src/app/model/proyecto';
import { CatalogosService } from 'src/app/services/catalogos.service';

@Component({
  selector: 'app-servicios-documentos',
  templateUrl: './servicios-documentos.component.html',
  styleUrls: ['./servicios-documentos.component.css']
})
export class ServiciosDocumentosComponent implements OnInit {
  @Input() documentos: ExpCatDocumentosServicios[] = [];
    
  constructor(
    private service: CatalogosService
  ) {
   }

  ngOnInit(): void {
    
  }

}
