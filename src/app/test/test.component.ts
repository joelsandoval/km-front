import { Component } from '@angular/core';
import { MessageService } from '../services/message.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  username: string = '';
  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    //this.userName = this.authService.getUsername();
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
