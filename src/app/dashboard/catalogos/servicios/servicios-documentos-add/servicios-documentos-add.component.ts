import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ExpCatDocumentosServicios, VwExpCatDocumentosServicios } from 'src/app/model/catalogos';
import { ExpCatDocumentos, ExpCatDocumentosCatego } from 'src/app/model/expediente';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ExpedienteService } from 'src/app/services/expediente.service';

@Component({
  selector: 'app-servicios-documentos-add',
  templateUrl: './servicios-documentos-add.component.html',
  styleUrls: ['./servicios-documentos-add.component.css']
})
export class ServiciosDocumentosAddComponent implements OnInit {
  
  categs: ExpCatDocumentosCatego = new ExpCatDocumentosCatego(); 
  categorias: ExpCatDocumentosCatego[] = [];
  documento: ExpCatDocumentosServicios = new ExpCatDocumentosServicios();
  nuevoS: VwExpCatDocumentosServicios = new VwExpCatDocumentosServicios();

  catego: number = 1;
  otros!: string;
  agregar: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ServiciosDocumentosAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private serviceCatalogo: CatalogosService,
    private serviceExp: ExpedienteService
  ) { }

  ngOnInit(): void {
    this.serviceExp.getExpedienteCatDocsCatego().subscribe(
      cat => {
        this.categorias = cat;
        this.documento.servicio = this.data;
        this.documento.estatus = true;
        console.log(this.data);
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardarDocumento(): void {
    let nuevo: ExpCatDocumentosServicios = new ExpCatDocumentosServicios();
    nuevo.estatus = true;
    nuevo.servicio = this.data;
    nuevo.documento = this.catego;  

    this.serviceExp.saveExpCatDocumentosServicios(nuevo).subscribe(
      niu => {
        this.nuevoS = niu;
        console.log(niu);
        this.dialogRef.close(niu);
      }
    )


      /* if (this.agregar) {
        let nuevoEx: ExpCatDocumentos = new ExpCatDocumentos();
        nuevoEx.documento = this.otros;
        nuevoEx.descripcion = this.otros;
        nuevoEx.orden = 0;
        nuevoEx.persona = 3;
        nuevoEx.tipo = this.catego;
        this.serviceExp.saveExpCatDocumento(nuevoEx).subscribe(
          resulta => {
            let nuevoEt: ExpedienteServicio = new ExpedienteServicio();
            this.expediente.documento = resulta.id
            this.serviceExp.saveExpediente(this.expediente).subscribe(
              result => {
                this.dialogRef.close(result);
              }
            )
          }
        )
      } else {
        
      } */


  }


}
