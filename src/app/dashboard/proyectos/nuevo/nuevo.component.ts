import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../../model/proyecto';
import { Moral, Fisica, PersonasMorales } from '../../../model/personas';
import { Par } from 'src/app/model/catalogos';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  selectedValue: string = '';
  

  proyecto: Proyecto = new Proyecto();
  personasMorales : PersonasMorales[] = [];
  sectores : Par[] = [];

  

  constructor(private service: CatalogosService,
              private proyectoService: ProyectosService,
              private _snackBar: MatSnackBar,
              private router: Router ) {}

  ngOnInit(): void {

    let tipo: number = 3;
      this.service.getListaClientes(tipo).subscribe(clis => {
        this.personasMorales = clis;
        console.log(clis);
      });

      this.service.getListaSectores().subscribe(sect => {
        this.sectores = sect;
        console.log('sectores:');
        console.log(sect);
      });
   }
    

   guardaProy(){
      this.proyecto.registro = new Date();
      this.proyecto.estatus = 1;
      this.proyectoService.saveProyecto(this.proyecto).subscribe(
        proy => { 
          this.openSnackBar('El proyecto se ha guardado con éxito', 'ok');
          this.router.navigate(['../proyectos']);
        }
      )
    
   }

   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
    
  }


