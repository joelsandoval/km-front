import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/seguridad/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  roles: string[] =[];
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.roles = this.authService.getRoles();
  }

  


}
