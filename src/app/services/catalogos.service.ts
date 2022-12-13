import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';
import { ActividadF, Proyecto, ProyectoF, ServicioF } from '../model/proyecto';
import { Categoria } from '../model/catalogos';

@Injectable({
  providedIn: 'root'
})

export class CatalogosService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  private proyectosUrl = environment.ApiConfig.rutaBase + 'catalogos/';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private httpOptionsPDF = { headers: new HttpHeaders({ 'Content-Type': 'application/pdf' }) };

  getServiciosCategorias(): Observable<Categoria[]> {
    const docsUrl = `${this.proyectosUrl}servicios/categorias`;
    return this.http.get<Categoria[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<Categoria[]>('No se pudieron recuperar los documentos', [])));
  }

  

  /** Log a HeroService message with the MessageService */
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
