import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { Token } from '../model/auth/token';
import { environment } from '../../environments/environment';
//import { MessageService } from '../messages/message.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
//import { Login } from 'src/app/model/login';
//import * as CryptoJS from 'crypto-js';
//import { Areas, Credenciales, PermisosO } from '../model/auth/credenciales';
//import { MenuPi } from '../model/auth/menup-i';


@Injectable({
  providedIn: 'root'
})
 
export class AuthService {

 /*  private urlApi: string = environment.ApiConfig.rutaAuth;
  private urlMIRA: string = environment.ApiConfig.rutaBase;  
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private messageService: MessageService
  ) {
  }

  loginMIRA(login: Login): Observable<any> {        
    return this.http.post(this.urlApi, login, this.httpOptions).pipe(
      tap(_ => this.log(`autenticado`)),
      catchError(this.handleError<any>('no autenticado'))
    );
  }

  getCredencialesUser(user: number): Observable<Credenciales> {               
    const urlC = `${this.urlMIRA}usuarios/credenciales/${user}`;
    return this.http.get<Credenciales>(urlC).pipe(
      tap(_ => this.log(`autenticado`)),
      catchError(this.handleError<Credenciales>('no autenticado'))
    );
  }

  getAuthorities(user: number): Observable<string[]> {               
    const urlA = `${this.urlMIRA}usuarios/permisos/user/${user}`;
    return this.http.get<string[]>(urlA).pipe(
      tap(_ => this.log(`autenticado`)),
      catchError(this.handleError<string[]>('no autenticado'))
    );
  }

  getMenuR(): Observable<MenuPi[]> {               
    const urlC = `${this.urlMIRA}utilerias/menu/r`;
    return this.http.get<MenuPi[]>(urlC).pipe(
      tap(_ => this.log(`autenticado`)),
      catchError(this.handleError<MenuPi[]>('no autenticado'))
    );
  }

  getHeaders(): HttpHeaders {    
    const hdrs = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return hdrs;
  }

  setToken(token: string): void{    
    localStorage.setItem('token', atob(token));    
  }

  setJoken(joken: string) {
    localStorage.setItem('joken', joken);
  }
  
  getPermisos(): string[] {
    return this.decryptJoken().permisos;
  }

  getPerfiles(): number[] {
    return this.decryptJoken().perfiles;
  }

  getPermisosO(): PermisosO[] {
    return this.decryptJoken().permisosArea;
  }

  getArea(): number{
    return this.decryptJoken().areas[0].id;
  }
  
  getAreaA(): Areas{
    return this.decryptJoken().areas[0];
  }

  getAreaSinat(): string {
    return this.decryptJoken().areas[0].sinatArea.trim();
  }

  getAreas(): Areas[] {
    return this.decryptJoken().areas;
  }

  getGrupo(): number {
    return this.decryptJoken().areas[0].nivel;
  }

  getAreasL(): number[] {
    return this.decryptJoken().areasId;
  }
  
  getAreaMain(): number {
    return this.decryptJoken().areaMain;
  }
  

  getSiglas(): string{
    return this.decryptJoken().user.siglas;
  }

  getNombreCompleto() : string {
    return this.decryptJoken().user.nombre + ' ' + this.decryptJoken().user.apellidoPaterno + ' ' + this.decryptJoken().user.apellidoMaterno;
  }

  getEntidad(): number{
    return this.decryptJoken().areas[0].entidad;
  }

  getEntidadS(): string{
    const u = this.decryptJoken().areas[0].entidad;
    let entidad: string;
    if (u < 10) { entidad = '0' + u.toString() } else { entidad = u.toString() }
    return entidad;
  }

  getAreaDir(): number {
    return this.decryptJoken().areaDir;
  }
    
  decryptJoken(): Credenciales {
    const s: string = CryptoJS.AES.decrypt(localStorage.getItem('joken'), 'dgira').toString(CryptoJS.enc.Utf8);
    const cred: Credenciales = JSON.parse(s);
    return cred;
  }



  flushToken() { 
    localStorage.clear(); 
    this.setToken('');            
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token !== null) {
      if (token.split('.').length === 3) {
        if (this.isTokenExpired()) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isTokenExpired(): boolean {
    const now = new Date();
    const exp = this.getExpFecha();
    if(now > exp) {
      return true;
    } else {
      return false;
    }
  }
  
  decode(): Token {
    const jwt: any = this.helper.decodeToken(this.getToken());
    return jwt;
  }


  decodeFromString(token: string): Token {
    const jwt: Token = this.helper.decodeToken(token);
    return jwt;
  }
  
 
  getUserName(): string {
    const token: Token = this.decodeFromString(this.getToken());
    return token.sub;
  }

  getUserId(): number {
    const token: Token = this.decodeFromString(this.getToken());
    return token.userId;
  }

  getRole(): string {
    const token: Token = this.decodeFromString(this.getToken());
    return token.role; 
  }

  getRoles(): string[] {
    const token: Token = this.decodeFromString(this.getToken());
    return token.roles; 
  }

  getExp(): number {
    const token: Token = this.decodeFromString(this.getToken());
    return token.exp; 
  }

  getIat(): number {
    const jwt = this.decodeFromString(this.getToken());
    return jwt.iat;
  }

  getExpFecha(): Date {
    const token: Token = this.decodeFromString(this.getToken());
    const expira = new Date(token.exp);
    return expira; 
  }

  getFecha(): string {
    const token: Token = this.decodeFromString(this.getToken());
    if (token.fecha === undefined) {
      token.fecha = new Date();
      return this.getCustomDate(token.fecha);
    } else {
      return token.fecha.toString();
    }
  } 

  getCustomDate(date: Date) {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();
    return [(dd > 9 ? '' : '0') + dd,
    (mm > 9 ? '' : '0') + mm,
    date.getFullYear(),
    ].join('/');
  }

  getInverseCustomDate(date: Date) {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();
    return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
    ].join('-');
  }

 
  public setRedirectUrl(url: string) {
    this.redirectUrl = url;
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
 */
}
