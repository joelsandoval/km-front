import { Component } from '@angular/core';
import { MessageService } from '../services/message.service'
import { AuthService } from '../services/seguridad/auth.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  username: string = '';
  uName: string = '';
  constructor(
    private messageService: MessageService,
   private authService: AuthService
  ) { }

  ngOnInit(): void {
   //this.uName = this.authService.getUsername();
    this.messageService.getMessage().subscribe({
      next: res => {

        this.username = res['text'];
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
