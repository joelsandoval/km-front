import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../../model/proyecto';
import { Moral, Fisica, PersonasMorales } from '../../../model/personas';
import { CatalogosService } from 'src/app/services/catalogos.service';

interface Food {
  value: string;
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
    {value: '1', viewValue: 'Ambiental'},
    {value: '2', viewValue: 'Energia y social'},
    {value: '3', viewValue: 'Auditoría legal (Due Diligence)'},
    {value: '4', viewValue: 'Gestión Administrativa'},
    {value: '5', viewValue: 'Litigio Administrativo'},
  ];

  proyecto: Proyecto = new Proyecto();
  personasMorales : any;

  clientes: Moral[] = [
    {
      id: 1,
      nombre: 'Caminos del Norte S.A. de C.V.',
      rfc: 'jjjj',
      telefono: '444'
    },
    {
      id: 1,
      nombre: 'Minera Santa María, S.A.',
      rfc: 'jjjj',
      telefono: '444'
    },
  ];
  
  

  constructor(private service: CatalogosService ) {}

  ngOnInit(): void {

    let tipo: number = 3;
      this.service.getListaClientes(tipo).subscribe(clis => {
        this.personasMorales = clis;
        console.log(clis);
      });
   }
    
    
  }


