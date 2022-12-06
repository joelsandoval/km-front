import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';
import { Proyecto, ProyectoF, ServicioF } from '../model/proyecto';

@Injectable({
  providedIn: 'root'
})

export class ProyectosService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  private proyectosUrl = environment.ApiConfig.rutaBase + 'proyectos/';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private httpOptionsPDF = { headers: new HttpHeaders({ 'Content-Type': 'application/pdf' }) };

  getProyectosActivos(): Observable<ProyectoF[]> {
    const docsUrl = `${this.proyectosUrl}activos`;
    return this.http.get<ProyectoF[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<ProyectoF[]>('No se pudieron recuperar los documentos', [])));
  }

  public saveArchivosOficios(documento: Proyecto): Observable<any> {
    const ruta = `${this.proyectosUrl}guarda-ao`;
    return this.http.post(ruta, documento, this.httpOptions).pipe(
      tap(_ => this.log(`archivo `)),
      catchError(this.handleError<any>('No se pudo actualizar el archivo'))
    );
  }

  getProyecto(proy: number): Observable<ProyectoF> {
    const proyUrl = `${this.proyectosUrl}${proy}`;
    return this.http.get<ProyectoF>(proyUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<ProyectoF>('No se pudieron recuperar los documentos')));
  }

  getProyectoServicios(proy: number): Observable<ServicioF[]> {
    const proyUrl = `${this.proyectosUrl}servicios/${proy}`;
    return this.http.get<ServicioF[]>(proyUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<ServicioF[]>('No se pudieron recuperar los documentos')));
  }

  getProyectoServicio(servicio: number): Observable<ServicioF> {
    const proyUrl = `${this.proyectosUrl}servicio/${servicio}`;
    return this.http.get<ServicioF>(proyUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<ServicioF>('No se pudieron recuperar los documentos')));
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
