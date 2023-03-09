import { User } from './../model/user';
import { Roles } from '../model/roles';
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
  private rolesURL = environment.ApiConfig.rutaBase + 'seguridad/roles/';
  private createUserURL = environment.ApiConfig.rutaBase + 'user/';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  getUsers(): Observable<User[]> {
    const docsUrl = `${this.userURL}`;
    return this.httpClient.get<User[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<User[]>('No se pudieron recuperar los documentos', [])));
  }

  getRoles(): Observable<Roles[]> {
    const docsUrl = `${this.rolesURL}`;
    return this.httpClient.get<Roles[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<Roles[]>('No se pudieron recuperar los documentos', [])));
  }

  public create(user: User): Observable<any> {
    return this.httpClient.post<any>(this.createUserURL + 'create', user, this.httpOptions);
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
