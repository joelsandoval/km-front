import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/seguridad/auth.service';
import { MessageService } from '../services/message.service';
import { OAuthService } from 'angular-oauth2-oidc';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private messageService2: MessageService,
     private oauthService: OAuthService
  ) { }

  ngOnInit(): void {
    //this.roles = this.authService.getRoles();
    //this.userName = this.authService.getUsername();
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

    this.messageService.getMessage().subscribe({
      next: res => {

        this.rol = res['text'];
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log('Request complete');
      }
    });

  }
}

