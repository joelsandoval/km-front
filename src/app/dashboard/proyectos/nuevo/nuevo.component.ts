import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../../model/proyecto';
import { Moral, Fisica, PersonasMorales } from '../../../model/personas';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ProyectosService } from 'src/app/services/proyectos.service';


interface Food {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  selectedValue: string = '';
  foods: Food[] = [
    {value: 1, viewValue: 'Ambiental'},
    {value: 2, viewValue: 'Energia y social'},
    {value: 3, viewValue: 'Auditoría legal (Due Diligence)'},
    {value: 4, viewValue: 'Gestión Administrativa'},
    {value: 5, viewValue: 'Litigio Administrativo'},
  ];

  proyecto: Proyecto = new Proyecto();
  personasMorales : any;

  
  
  

  constructor(private service: CatalogosService,
              private proyectoService: ProyectosService ) {}

  ngOnInit(): void {

    let tipo: number = 3;
      this.service.getListaClientes(tipo).subscribe(clis => {
        this.personasMorales = clis;
        console.log(clis);
      });
   }
    

   guardaProy(){
      this.proyecto.registro = new Date();
      console.log(this.proyecto);
      console.log('Este proyecto es:', this.proyecto.cliente);
      this.proyectoService.saveProyecto(this.proyecto).subscribe(
        proy=> console.log(proy)
      )
    
   }


    
  }


