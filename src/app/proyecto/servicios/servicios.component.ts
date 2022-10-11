import { Component, OnInit } from '@angular/core';
import { ServiciosNuevoComponent } from '../servicios-nuevo/servicios-nuevo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openDialog() {
    const dialogRef = this.dialog.open(ServiciosNuevoComponent);

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(`Dialog result: ${result}`);
      }
    );
  }

}
