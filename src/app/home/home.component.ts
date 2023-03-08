import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/seguridad/auth.service';
import { MessageService } from '../services/message.service';
import { Credenciales } from '../model/seguridad';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  roles: string[] = [];
  username: string = '';
  userName: string = '';
  rol: string = '';
  claims: any;
  credenciales: Credenciales = new Credenciales('','',[]);
  isLogged: boolean = false;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) { 
    this.messageService.getMessage().subscribe(
      res => {
        this.credenciales = res['text'];
        this.isLogged = this.authService.getIsLogged();
      }
    );
  }

  ngOnInit(): void {    
    this.credenciales = this.authService.getCredenciales();
    this.isLogged = this.authService.getIsLogged();
  }

  login() {
    this.authService.login();
  }
  
}

