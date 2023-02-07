import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from '../services/message.service';

import { environment } from '../../environments/environment';
import { Archivo } from '../model/archivos';


@Injectable({
  providedIn: 'root'
})

export class FileUploadService {
  
  rutaBase: string = `${environment.ApiConfig.rutaBase}filesystem/`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) {
    }

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  public postArchivoServicio(fileToUpload: File, cliente: number, proyecto: number, servicio: number): Observable<Archivo> {
    const endpoint1 = `${this.rutaBase}upload-pdf/servicio/${cliente},${proyecto},${servicio}`;
    const formData1: FormData = new FormData();
    formData1.append('file', fileToUpload);
    console.log(formData1);
    return this.http.post<Archivo>(endpoint1, formData1).pipe(
      tap(_ => this.log(`se ha subido el archivo ${fileToUpload.name}`)),
      catchError(this.handleError<any>('updateComentario'))
    );
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
