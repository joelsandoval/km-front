import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { EntidadBorra } from '../../servicios/servicios-del/servicios-del.component';

@Component({
  selector: 'app-actividades-del',
  templateUrl: './actividades-del.component.html',
  styleUrls: ['./actividades-del.component.css']
})
export class ActividadesDelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ActividadesDelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntidadBorra,
    private service: CatalogosService,
  ) { }

  ngOnInit(): void {
  }

  deleteCatego() {
    switch (this.data.tipo) {
      case 1:
        this.service.delActividadTipo(this.data.id).subscribe(
          _ => this.dialogRef.close(this.data)
        )
        break;

      case 2:
        this.service.delActividad(this.data.id).subscribe(
          _ => this.dialogRef.close(this.data)
        )
        break;

    }
  }

  noClick() {
    this.dialogRef.close();
  }
}
