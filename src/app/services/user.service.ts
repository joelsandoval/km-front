import { User } from './../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {


  private userURL = environment.ApiConfig.rutaBase + 'seguridad/users/';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  getUsers(): Observable<User[]> {
    const docsUrl = `${this.userURL}`;
    return this.httpClient.get<User[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<User[]>('No se pudieron recuperar los documentos', [])));
  }

  public create(user: User): Observable<any> {
    return this.httpClient.post<any>(this.userURL + 'create', user, this.httpOptions);
  }

  private log(message: string) {
    this.messageService.add(`PrioritariosService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
