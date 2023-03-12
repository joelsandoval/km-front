import { User } from './../model/seguridad/user';
import { UserService } from '../services/seguridad/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRepresentation } from '../model/seguridad/seguridad';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
  rol!: string;

  constructor(
    private userService: UserService, 
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    const user = new  UserRepresentation('','','','',[],[]);
    this.userService.create(user).subscribe(
      data => {
        console.log(data);
        this.volver();
      },
      err => console.log(err)
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }

}
