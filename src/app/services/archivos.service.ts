import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from '../services/message.service';
import { environment } from '../../environments/environment';
import { Archivo, ArchivoTipos, ArchivosActividades } from '../model/archivos';

@Injectable({
  providedIn: 'root'
})

export class ArchivosService {

  docs: Archivo[] = [];


  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  private tramiteUrl = environment.ApiConfig.rutaBase + 'archivos/';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private httpOptionsPDF = { headers: new HttpHeaders({ 'Content-Type': 'application/pdf' }) };

  getDocumentos(tramite: number | string): Observable<Archivo[]> {
    const docsUrl = this.tramiteUrl + 'tramite/' + tramite;
    return this.http.get<Archivo[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<Archivo[]>('No se pudieron recuperar los documentos', [])));
  }

  getArchivoTipos(): Observable<ArchivoTipos[]> {
    const docsUrl = `${this.tramiteUrl}tipos`;
    return this.http.get<ArchivoTipos[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<ArchivoTipos[]>('No se pudieron recuperar los documentos', [])));
  }

  getArchivoTiposCatego(catego: number): Observable<ArchivoTipos[]> {
    const docsUrl = `${this.tramiteUrl}tiposC/${catego}`;
    return this.http.get<ArchivoTipos[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<ArchivoTipos[]>('No se pudieron recuperar los documentos', [])));
  }

  public updateArchivo(documento: Archivo): Observable<Archivo> {
    const ruta = `${this.tramiteUrl}`;
    return this.http.post<Archivo>(ruta, documento, this.httpOptions).pipe(
      tap(_ => this.log(`actualizado documento ${documento.descripcion}`)),
      catchError(this.handleError<any>('No se pudo actualizar el archivo'))
    );
  }


  public borraArchivo(documento: Archivo): Observable<any> {
    const ruta = `${environment.ApiConfig.rutaBase}archivo/borra`;
    return this.http.post(ruta, documento, this.httpOptions).pipe(
      tap(_ => this.log(`actualizado documento ${documento.descripcion}`)),
      catchError(this.handleError<any>('No se pudo actualizar el archivo'))
    );
  }

  getPorExpediente(expediente: number): Observable<Archivo[]> {
    const ofisUrl = `${this.tramiteUrl}expediente/${expediente}`;
    return this.http.get<Archivo[]>(ofisUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<Archivo[]>('No se pudieron recuperar los documentos')));
  }

  getPorExpedienteTT(tramite: number, tipo: number): Observable<Archivo[]> {
    const ofisUrl = `${this.tramiteUrl}expediente/tramite/${tramite},${tipo}`;
    return this.http.get<Archivo[]>(ofisUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<Archivo[]>('No se pudieron recuperar los documentos')));
  }

  getDocumentosProyecto(proyecto: number | string): Observable<Archivo[]> {
    const docsUrl = this.tramiteUrl + 'proyecto/' + proyecto;
    return this.http.get<Archivo[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<Archivo[]>('No se pudieron recuperar los documentos', [])));
  }

  getDocumentosActividad(actividad: number | string): Observable<Archivo[]> {
    const docsUrl = this.tramiteUrl + 'actividad/' + actividad;
    return this.http.get<Archivo[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<Archivo[]>('No se pudieron recuperar los documentos', [])));
  }
  
  public saveActividades(actividad: ArchivosActividades): Observable<Archivo> {
    const ruta = `${this.tramiteUrl}/actividad`;
    return this.http.post<Archivo>(ruta, actividad, this.httpOptions).pipe(
      tap(_ => this.log(`actualizado documento ${actividad.actividad}`)),
      catchError(this.handleError<any>('No se pudo actualizar el archivo'))
    );
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
