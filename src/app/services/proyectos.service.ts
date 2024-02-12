import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';
import { Actividad, ActividadF, Proyecto, ProyectoEquipo, ProyectoF, Servicio, ServicioF, ServiciosVencimiento, VwActividades } from '../model/proyecto';
import { Fisica } from '../model/personas';
import { SegUsuarios } from '../model/seguridad/user';

@Injectable({
  providedIn: 'root'
})

export class ProyectosService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,

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

  public saveProyectoServicio(servicio: Servicio): Observable<ServicioF> {
    const ruta = `${this.proyectosUrl}servicio`;
    return this.http.post<ServicioF>(ruta, servicio, this.httpOptions).pipe(
      tap(_ => this.log(`servicio `)),
      catchError(this.handleError<ServicioF>('No se pudo guardar el servicio'))
    );
  }

  public saveProyecto(proyecto: Proyecto): Observable<Proyecto> {
    const ruta = `${this.proyectosUrl}`;
    return this.http.post<Proyecto>(ruta, proyecto,this.httpOptions).pipe(
      tap(_ => this.log(`proyecto`)),
      catchError(this.handleError<Proyecto>('No se pudo guardar el proyecto'))
    );
  }

  getProyectoServicio(servicio: number): Observable<ServicioF> {
    const proyUrl = `${this.proyectosUrl}servicio/${servicio}`;
    return this.http.get<ServicioF>(proyUrl)
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<ServicioF>('No se pudieron recuperar los documentos')));
  }

  getProyectoActividades(servicio: number): Observable<ActividadF[]> {
    const proyUrl = `${this.proyectosUrl}actividades/${servicio}`;
    return this.http.get<ActividadF[]>(proyUrl)
      .pipe(tap(_ => this.log('se recuperaron las actividades')),
        catchError(this.handleError<ActividadF[]>('No se pudieron recuperar los actividades')));
  }

  public saveActividadServicio(actividad: Actividad): Observable<any> {
    const ruta = `${this.proyectosUrl}actividades`;
    return this.http.post(ruta, actividad, this.httpOptions).pipe(
      tap(_ => this.log(`archivo `)),
      catchError(this.handleError<any>('No se pudo actualizar el archivo'))
    );
  }


  public delActividadServicio(actividad: number): Observable<any> {
    const ruta = `${this.proyectosUrl}actividad/borra/${actividad}`;
    return this.http.get<any[]>(ruta)
    .pipe(tap(_ => this.log('se recuperaron las actividades')),
      catchError(this.handleError<any[]>('No se pudieron recuperar los actividades')));
  }

  getProximoVencimiento(servicio: number): Observable<ActividadF> {
    const proyUrl = `${this.proyectosUrl}vencimiento/${servicio}`;
    return this.http.get<ActividadF>(proyUrl)
      .pipe(tap(_ => this.log('se recuperaron las actividades')),
        catchError(this.handleError<ActividadF>('No se pudieron recuperar los actividades')));
  }

  getServiciosVencimiento(proyecto: number): Observable<ServiciosVencimiento[]> {
    const proyUrl = `${this.proyectosUrl}servicios/vencimiento/${proyecto}`;
    return this.http.get<ServiciosVencimiento[]>(proyUrl)
      .pipe(tap(_ => this.log('se recuperaron las actividades')),
        catchError(this.handleError<ServiciosVencimiento[]>('No se pudieron recuperar los actividades')));
  }

  public saveProyectoEquipo(equipo: ProyectoEquipo): Observable<SegUsuarios> {
    const ruta = `${this.proyectosUrl}equipo`;
    return this.http.post<SegUsuarios>(ruta, equipo, this.httpOptions).pipe(
      tap(_ => this.log(`nuevo equipo`)),
      catchError(this.handleError<any>('No se pudo agregar'))
    );
  }

  getEquipo(proyecto: number): Observable<SegUsuarios[]> {
    const proyUrl = `${this.proyectosUrl}equipo/${proyecto}`;
    return this.http.get<SegUsuarios[]>(proyUrl)
      .pipe(tap(_ => this.log('se recuperaron las actividades')),
        catchError(this.handleError<SegUsuarios[]>('No se pudieron recuperar los actividades')));
  }

  public delEquipo(proyecto: number, usuario: number): Observable<any> {
    const ruta = `${this.proyectosUrl}equipo/borra/${proyecto},${usuario}`;
    return this.http.get<any[]>(ruta)
    .pipe(tap(_ => this.log('se recuperaron las actividades')),
      catchError(this.handleError<any[]>('No se pudieron recuperar los actividades')));
  }

  getActividadesPendientes(usuario: number): Observable<VwActividades[]> {
    const proyUrl = `${this.proyectosUrl}actividades/pendientes/${usuario}`;
    return this.http.get<VwActividades[]>(proyUrl)
      .pipe(tap(_ => this.log('se recuperaron las actividades')),
        catchError(this.handleError<VwActividades[]>('No se pudieron recuperar los actividades')));
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
