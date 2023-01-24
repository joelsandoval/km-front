import { Component, Input, OnInit } from '@angular/core';
import { VwExpCatDocumentosServicios} from 'src/app/model/catalogos';
import { CatalogosService } from 'src/app/services/catalogos.service';

@Component({
  selector: 'app-servicios-documentos',
  templateUrl: './servicios-documentos.component.html',
  styleUrls: ['./servicios-documentos.component.css']
})
export class ServiciosDocumentosComponent implements OnInit {
  @Input() documentos: VwExpCatDocumentosServicios[] = [];
    
  constructor(
    private service: CatalogosService
  ) {
   }

  ngOnInit(): void {
    
  }

  borraDocumento(doc: VwExpCatDocumentosServicios) {

  }

  nuevoDocumento() {
    
  }

}
