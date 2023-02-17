import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { VwExpCatActividadesServicios } from 'src/app/model/catalogos';
import { CatalogosService } from 'src/app/services/catalogos.service';

@Component({
  selector: 'app-servicios-actividades',
  templateUrl: './servicios-actividades.component.html',
  styleUrls: ['./servicios-actividades.component.css']
})
export class ServiciosActividadesComponent implements OnInit {
  @Input() servicio!: number;
  actividades: VwExpCatActividadesServicios[] = [];

  constructor(
    private serviceCat: CatalogosService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.serviceCat.getCatActividadesServicio(changes['servicio'].currentValue).subscribe(
      actis => this.actividades = actis
    )


  }

  nuevaActividad() {

  }

  borraActividad(activ: VwExpCatActividadesServicios) {

  }

}
