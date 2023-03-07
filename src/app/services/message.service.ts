import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  

  add(message: string){
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

   /** Log a HeroService message with the MessageService */
   log(message: string) {
    this.add(`TramiteService: ${message}`);
  }

    handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private subject = new Subject<any>();

  public sendMessage(message: any): void {
    this.subject.next({text: message});
  }

  public getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
