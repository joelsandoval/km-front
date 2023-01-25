import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from '../services/message.service';

import { environment } from '../../environments/environment';
import { ExpCatDocumentos, ExpCatDocumentosCatego, ExpedienteServicio, ExpedienteServicioCatF, ExpedienteServicioF, ExpServicioArchivos } from '../model/expediente';
import { ExpCatDocumentosServicios, VwExpCatDocumentosServicios } from '../model/catalogos';

@Injectable({
  providedIn: 'root'
})

export class ExpedienteService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private expedienteUrl = environment.ApiConfig.rutaBase + 'expediente/';

  
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  generaExpediente(servicio: number, estudio: number, persona: number): Observable<ExpedienteServicioCatF[]> {
    const url = `${this.expedienteUrl}crea/${servicio},${estudio},${persona}`;
    return this.http.get<ExpedienteServicioCatF[]>(url).pipe(
      tap((_) => this.log(`siguiente numero = ${servicio}`)),
      catchError(
        this.handleError<ExpedienteServicioCatF[]>(
          `No se pudo recuperar el expediente numero=${servicio}`
        )
      )
    );
  }  

  getExpedienteTramiteTipo(tramite: number, tipo: number): Observable<ExpedienteServicioF[]> {
    const url = `${this.expedienteUrl}tramite/${tramite},${tipo}`;
    return this.http.get<ExpedienteServicioF[]>(url)
      .pipe(tap(_ => this.log('Se recuperó el expediente')),
        catchError(this.handleError<ExpedienteServicioF[]>('No se pudo recuperar el expediente')));
  }

  saveExpediente(expediente: ExpedienteServicio): Observable<any> {
    let url = `${this.expedienteUrl}guarda`;
    return this.http.post(url, expediente, this.httpOptions).pipe(
      tap(_ => this.log(`se insertó este foco de seguimiento ${expediente.comentarios}`)),
      catchError(this.handleError<any>('updatePrioritario'))
    );
  }

  getExpCatDocumentos(catego: number, persona: number, tramite: number): Observable<ExpCatDocumentos[]> {
    const url = `${this.expedienteUrl}catalogo/tipo/${catego},${persona},${tramite}`;
    return this.http.get<ExpCatDocumentos[]>(url)
      .pipe(tap(_ => this.log('Se recuperó el expediente')),
        catchError(this.handleError<ExpCatDocumentos[]>('No se pudo recuperar el expediente')));
  }

  saveExpCatDocumento(expediente: ExpCatDocumentos): Observable<any> {
    let url = `${this.expedienteUrl}catalogo/guarda`;
    return this.http.post(url, expediente, this.httpOptions).pipe(
      tap(_ => this.log(`se insertó un nuevo documento al catálogo ${expediente.documento}`)),
      catchError(this.handleError<any>('updatePrioritario'))
    );
  }

  saveExpTramiteArchivo(expediente: ExpServicioArchivos): Observable<any> {
    let url = `${this.expedienteUrl}archivos/guarda`;
    return this.http.post(url, expediente, this.httpOptions).pipe(
      tap(_ => this.log(`se insertó un nuevo archivo ${expediente.archivo}`)),
      catchError(this.handleError<any>('updatePrioritario'))
    );
  }

  getExpedienteServicio(servicio: number): Observable<ExpedienteServicioF[]> {
    const url = `${this.expedienteUrl}servicio/${servicio}`;
    return this.http.get<ExpedienteServicioF[]>(url)
      .pipe(tap(_ => this.log('Se recuperó el expediente')),
        catchError(this.handleError<ExpedienteServicioF[]>('No se pudo recuperar el expediente')));
  }

  getExpedienteCatServicio(servicio: number): Observable<ExpedienteServicioCatF[]> {
    const url = `${this.expedienteUrl}cat/servicio/${servicio}`;
    return this.http.get<ExpedienteServicioCatF[]>(url)
      .pipe(tap(_ => this.log('Se recuperó el expediente')),
        catchError(this.handleError<ExpedienteServicioCatF[]>('No se pudo recuperar el expediente')));
  }


  getExpedienteCatDocsCatego(): Observable<ExpCatDocumentosCatego[]> {
    const url = `${this.expedienteUrl}cat/categorias`;
    return this.http.get<ExpCatDocumentosCatego[]>(url)
      .pipe(tap(_ => this.log('Se recuperó el expediente')),
        catchError(this.handleError<ExpCatDocumentosCatego[]>('No se pudo recuperar el expediente')));
  }

  saveExpCatDocumentosServicios(expediente: ExpCatDocumentosServicios): Observable<VwExpCatDocumentosServicios> {
    let url = `${this.expedienteUrl}documentos/servicios/guarda`;
    return this.http.post<VwExpCatDocumentosServicios>(url, expediente, this.httpOptions).pipe(
      tap(_ => this.log(`se insertó un nuevo documento al catálogo ${expediente.documento}`)),
      catchError(this.handleError<VwExpCatDocumentosServicios>('updatePrioritario'))
    );
  }


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TramiteService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
