import { Component, OnInit } from '@angular/core';
import { Credenciales } from 'src/app/model/seguridad/seguridad';
import { AuthService } from 'src/app/services/seguridad/auth.service';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent implements OnInit {
  
  

  constructor(
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    let cred: Credenciales = this.auth.getCredenciales();
    console.log(cred);
    let token: any = this.auth.getToken();
    console.log(token);

  }

  
}
