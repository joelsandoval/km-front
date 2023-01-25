import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';
import { ActividadF, Proyecto, ProyectoF, ServicioF } from '../model/proyecto';
import { CatActividadesTipo, Categoria, VwExpCatDocumentosServicios, Servicios } from '../model/catalogos';
import { Fisica, FisicaF, PersonasMorales } from '../model/personas';

@Injectable({
  providedIn: 'root'
})

export class CatalogosService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  private catalogosUrl = environment.ApiConfig.rutaBase + 'catalogos/';
  private personasUrl = environment.ApiConfig.rutaBase + 'personas/';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private httpOptionsPDF = { headers: new HttpHeaders({ 'Content-Type': 'application/pdf' }) };

  getServiciosCategorias(): Observable<Categoria[]> {
    const docsUrl = `${this.catalogosUrl}servicios/categorias`;
    return this.http.get<Categoria[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<Categoria[]>('No se pudieron recuperar los documentos', [])));
  }

  getActividadesTipo(): Observable<CatActividadesTipo[]> {
    const docsUrl = `${this.catalogosUrl}actividades/tipos`;
    return this.http.get<CatActividadesTipo[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<CatActividadesTipo[]>('No se pudieron recuperar los documentos', [])));
  }

  getPersonasMoral(moral: number): Observable<FisicaF[]> {
    const docsUrl = `${this.personasUrl}fisicas/moral/${moral}`;
    return this.http.get<FisicaF[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<FisicaF[]>('No se pudieron recuperar los documentos', [])));
  }

  getListaClientes(tipo: number): Observable<PersonasMorales[]> {
    const docsUrl =  `${this.personasUrl}morales/tipo/${tipo} `;
    return this.http.get<PersonasMorales[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los clientes')),
        catchError(this.handleError<PersonasMorales[]>('No se pudieron recuperar los clientes', [])));
  }

  public updCategoria(catego: Categoria): Observable<Categoria> {
    const ruta = `${this.catalogosUrl}categoria`;
    return this.http.post<Categoria>(ruta, catego, this.httpOptions).pipe(
      tap(_ => this.log(`actualizado servicio ${catego.categoria}`)),
      catchError(this.handleError<Categoria>('No se pudo actualizar el archivo'))
    );
  }

  public updServicio(servicio: Servicios): Observable<Servicios> {
    const ruta = `${this.catalogosUrl}servicio`;
    return this.http.post<Servicios>(ruta, servicio, this.httpOptions).pipe(
      tap(_ => this.log(`actualizado servicio ${servicio.servicio}`)),
      catchError(this.handleError<Servicios>('No se pudo actualizar el archivo'))
    );
  }

  delCategoria(catego: number): Observable<any> {
    const docsUrl = `${this.catalogosUrl}categoria/delete/${catego}`;
    return this.http.get(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError('No se pudieron recuperar los documentos', [])));
  }

  delServicio(servicio: number): Observable<any> {
    const docsUrl = `${this.catalogosUrl}servicio/delete/${servicio}`;
    return this.http.get(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError('No se pudieron recuperar los documentos', [])));
  }

  getExpDocsServicio(servicio: number): Observable<VwExpCatDocumentosServicios[]> {
    const docsUrl = `${this.catalogosUrl}servicio/documentos/${servicio}`;
    return this.http.get<VwExpCatDocumentosServicios[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<VwExpCatDocumentosServicios[]>('No se pudieron recuperar los documentos', [])));
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
