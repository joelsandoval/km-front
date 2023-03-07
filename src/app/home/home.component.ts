import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/seguridad/auth.service';
import { MessageService } from '../services/message.service';
import { OAuthService } from 'angular-oauth2-oidc';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private messageService2: MessageService,
     private oauthService: OAuthService
  ) { 
    this.messageService.getMessage().subscribe(
      res => {
        console.log('se está recibiendo');
        console.log(res);
        this.credenciales = res['text'];
      }
    );
  }

  ngOnInit(): void {
    //this.roles = this.authService.getRoles();
    this.userName = this.authService.getUsername();
    //this.userName =  this.oauthService.getIdentityClaims()[`preferred_username`];
  /*   this.messageService2.getMessage().subscribe({
      next: res => {

        this.username = res['text'];

      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log('Request complete');
      }
    }); */

  }
}

