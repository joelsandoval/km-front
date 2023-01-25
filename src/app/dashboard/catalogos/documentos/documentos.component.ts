import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpCatDocumentos, ExpCatDocumentosCatego } from 'src/app/model/expediente';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { DocumentosDelComponent } from './documentos-del/documentos-del.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  categorias: ExpCatDocumentosCatego[] = [];

  nueva: ExpCatDocumentosCatego = new ExpCatDocumentosCatego();
  seleccionada: ExpCatDocumentosCatego = new ExpCatDocumentosCatego();
  nuevaBool: boolean = false;

  nuevo: ExpCatDocumentos = new ExpCatDocumentos();
  seleccionado: ExpCatDocumentos = new ExpCatDocumentos();
  nuevoBool: boolean = false;

  constructor(
    private serviceExp: ExpedienteService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.serviceExp.getExpedienteCatDocsCatego().subscribe(
      cat => {
        this.categorias = cat;
      }
    )
  }

  nuevaCatego() {
    this.nuevaBool = true;
  }

  nuevoDocumento() {
    this.nuevoBool = true;
  }

  cancelCatego() {
    this.nuevaBool = false;
  }

  cancelDocumento() {
    this.nuevoBool = false;
  }

  guardaCatego() {
    this.serviceExp.saveExpCatDocumentosCatego(this.nueva).subscribe(
      cate => {
        if (cate) {
          this.categorias.push(cate);
          this.nuevaBool = false;
        }
      }
    )
  }

  selectCatego(value: ExpCatDocumentosCatego) {
    this.seleccionada = value;
    this.seleccionado = new ExpCatDocumentos();
    this.nuevo.tipo = value.id;
  }

  borraCatego(catego: ExpCatDocumentosCatego) {
    const dialogRef = this.dialog.open(DocumentosDelComponent, {
      height: '250px',
      width: '450px',
      data: {
        tipo: 1,
        id: catego.id,
        descripcion: catego.categoria
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index: number = this.categorias.indexOf(catego);
        if (index !== -1) {
          this.categorias.splice(index, 1);
        }
      }
    });
  }

  selectDocumento(value: ExpCatDocumentos) {
    this.seleccionado = value;

  }

  guardarDocumento(value: ExpCatDocumentos, tipo: number) {

    this.serviceExp.saveExpCatDocumento(value).subscribe(
      doc => {
        this.seleccionado = doc;
        this.nuevoBool = false;
        let catego: ExpCatDocumentosCatego = this.categorias.find(x => x.id == value.tipo)!;
        catego.documentos.push(doc);
      }
    )
  }

  borraDocumento(doc: ExpCatDocumentos) {
    const dialogRef = this.dialog.open(DocumentosDelComponent, {
      height: '250px',
      width: '450px',
      data: {
        tipo: 2,
        id: doc.id,
        descripcion: doc.documento
      },
    }); 

    dialogRef.afterClosed().subscribe(result => {
      let categ: ExpCatDocumentosCatego = this.categorias.find(x => x.id == doc.tipo)!; 
      console.log(categ);
      const index: number = categ.documentos.indexOf(doc);
        if (index !== -1) {
          categ.documentos.splice(index, 1);
          this.seleccionado = new ExpCatDocumentos();
        }
    });
  }

}
