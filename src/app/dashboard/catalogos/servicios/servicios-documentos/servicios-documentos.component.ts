import { Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { VwExpCatDocumentosServicios } from 'src/app/model/catalogos';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ServiciosDelComponent } from '../servicios-del/servicios-del.component';
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

  borraDocumento(servi: VwExpCatDocumentosServicios) {
    const dialogRef = this.dialog.open(ServiciosDelComponent, {
      height: '250px',
      width: '450px',
      data: {
        tipo: 3,
        id: servi.id,
        descripcion: servi.documento
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      let doc: VwExpCatDocumentosServicios = this.documentos.find(x => x.id == servi.id)!; 
      console.log(doc);
      const index: number = this.documentos.indexOf(servi);
        if (index !== -1) {
          this.documentos.splice(index, 1);
        }
    });
  }

  nuevoDocumento() {
    const dialogRef = this.dialog.open(ServiciosDocumentosAddComponent, {
      height: '400px',
      width: '700px',
      data: this.servicio
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.documentos.push(result);
      }
    });
  }

}
