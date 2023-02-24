import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/seguridad/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {

  }

  public login(): void {
    this.loginService.login();
  }

  public logout(): void {
    this.loginService.logout();
  }

}
