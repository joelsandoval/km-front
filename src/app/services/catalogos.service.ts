import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';
import { CatActividadesTipo, Categoria, VwExpCatDocumentosServicios, Servicios, CatActividades, VwExpCatActividadesServicios, Par } from '../model/catalogos';
import { FisicaF, PersonasMorales } from '../model/personas';


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

  public saveCliente(cliente: PersonasMorales): Observable<PersonasMorales> {
    const ruta = `${this.personasUrl}moral`;
    return this.http.post<PersonasMorales>(ruta, cliente, this.httpOptions).pipe(
      tap(_ => this.log(`personas`)),
      catchError(this.handleError<PersonasMorales>('No se pudo guardar el cliente'))
    );
  }

  public updCliente(cliente: PersonasMorales): Observable<PersonasMorales> {
    const ruta = `${this.personasUrl}moral`;
    return this.http.post<PersonasMorales>(ruta, cliente, this.httpOptions).pipe(
      tap(_ => this.log(`actualizado cliente ${cliente.razon}`)),
      catchError(this.handleError<PersonasMorales>('No se pudo actualizar el cliente'))
    );
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

  delExpDocsServicio(doc: number): Observable<any> {
    const docsUrl = `${this.catalogosUrl}servicio/documentos/delete/${doc}`;
    return this.http.get(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError('No se pudieron recuperar los documentos')));
  }

  public updActividad(actividad: CatActividades): Observable<CatActividades> {
    const ruta = `${this.catalogosUrl}actividad`;
    return this.http.post<CatActividades>(ruta, actividad, this.httpOptions).pipe(
      tap(_ => this.log(`actualizado servicio ${actividad.actividad}`)),
      catchError(this.handleError<CatActividades>('No se pudo actualizar el archivo'))
    );
  }

  delActividad(act: number): Observable<any> {
    const docsUrl = `${this.catalogosUrl}actividad/delete/${act}`;
    return this.http.get(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError('No se pudieron recuperar los documentos')));
  }

  public updActividadTipo(actividad: CatActividadesTipo): Observable<CatActividadesTipo> {
    const ruta = `${this.catalogosUrl}actividad/tipo`;
    return this.http.post<CatActividadesTipo>(ruta, actividad, this.httpOptions).pipe(
      tap(_ => this.log(`actualizado servicio ${actividad.actividadTipo}`)),
      catchError(this.handleError<CatActividadesTipo>('No se pudo actualizar el archivo'))
    );
  }

  delActividadTipo(act: number): Observable<any> {
    const docsUrl = `${this.catalogosUrl}actividad/tipo/delete/${act}`;
    return this.http.get(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError('No se pudieron recuperar los documentos')));
  }

  getCatActividadesServicio(servicio: number): Observable<VwExpCatActividadesServicios[]> {
    const docsUrl = `${this.catalogosUrl}servicio/actividades/${servicio}`;
    return this.http.get<VwExpCatActividadesServicios[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<VwExpCatActividadesServicios[]>('No se pudieron recuperar los documentos', [])));
  }

  /** ---------- **/

  getListaSectores(): Observable<Par[]> {
    const docsUrl =  `${this.catalogosUrl}sectores/ `;
    return this.http.get<Par[]>(docsUrl)
      .pipe(tap(_ => this.log('Se recuperaron los sectores')),
        catchError(this.handleError<Par[]>('No se pudieron recuperar los sectores', [])));
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
