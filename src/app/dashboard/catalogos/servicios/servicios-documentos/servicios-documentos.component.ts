import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VwExpCatDocumentosServicios } from 'src/app/model/catalogos';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ServiciosDocumentosAddComponent } from '../servicios-documentos-add/servicios-documentos-add.component';

@Component({
  selector: 'app-servicios-documentos',
  templateUrl: './servicios-documentos.component.html',
  styleUrls: ['./servicios-documentos.component.css']
})
export class ServiciosDocumentosComponent implements OnInit {
  @Input() documentos: VwExpCatDocumentosServicios[] = [];
  @Input() servicio!: number;

  constructor(
    private service: CatalogosService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

  }

  borraDocumento(doc: VwExpCatDocumentosServicios) {

  }

  nuevoDocumento() {
    const dialogRef = this.dialog.open(ServiciosDocumentosAddComponent, {
      height: '250px',
      width: '400px',
      data: this.servicio
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.documentos.push(result);
      }
    });
  }

}
