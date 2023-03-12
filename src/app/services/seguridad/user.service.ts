import { User } from '../../model/seguridad/user';
import { Roles } from '../../model/seguridad/roles';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { UserRepresentation } from 'src/app/model/seguridad/seguridad';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = environment.ApiConfig.rutaBase + 'seguridad/users/';
  private rolesURL = environment.ApiConfig.rutaBase + 'seguridad/roles/';
  private seguridadURL = environment.ApiConfig.rutaBase + 'seguridad/';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  getUsers(): Observable<UserRepresentation[]> {
    const usersUrl = `${this.seguridadURL}users`;
    return this.httpClient.get<UserRepresentation[]>(usersUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<UserRepresentation[]>('No se pudieron recuperar los documentos', [])));
  }

  getRoles(): Observable<Roles[]> {
    const rolesUrl = `${this.seguridadURL}roles`;
    return this.httpClient.get<Roles[]>(rolesUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<Roles[]>('No se pudieron recuperar los documentos', [])));
  }

  public create(user: UserRepresentation): Observable<UserRepresentation> {
    return this.httpClient.post<UserRepresentation>(`${this.seguridadURL}create-user`, user, this.httpOptions);
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
