import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogosService } from 'src/app/services/catalogos.service';

export interface EntidadBorra {
  tipo: number;
  id: number;
  descripcion: string;
}

@Component({
  selector: 'app-servicios-del',
  templateUrl: './servicios-del.component.html',
  styleUrls: ['./servicios-del.component.css']
})
export class ServiciosDelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ServiciosDelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntidadBorra,
    private serviceCatalogo: CatalogosService,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  deleteCatego() {
    if(this.data.tipo == 1) {
      this.serviceCatalogo.delCategoria(this.data.id).subscribe(
        _ => this.dialogRef.close()
      )
    } else {
      this.serviceCatalogo.delServicio(this.data.id).subscribe(
        _ => this.dialogRef.close()
      )
    }
  }

}
