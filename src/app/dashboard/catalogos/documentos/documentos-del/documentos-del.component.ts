import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { EntidadBorra } from '../../servicios/servicios-del/servicios-del.component';

@Component({
  selector: 'app-documentos-del',
  templateUrl: './documentos-del.component.html',
  styleUrls: ['./documentos-del.component.css']
})
export class DocumentosDelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DocumentosDelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntidadBorra,
    private service: ExpedienteService,
  ) { }

  ngOnInit(): void {

  }

  deleteCatego() {
    switch (this.data.tipo) {
      case 1:
        this.service.delExpDocsCatego(this.data.id).subscribe(
          _ => this.dialogRef.close(this.data)
        )
        break;

      case 2:
        this.service.delExpDocumentos(this.data.id).subscribe(
          _ => this.dialogRef.close(this.data)
        )
        break;

    }
  }

  noClick() {
    this.dialogRef.close();
  }

}
