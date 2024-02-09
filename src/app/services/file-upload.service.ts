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
    const endpoint1 = `${this.rutaBase}upload/servicio/${cliente},${proyecto},${servicio}`;
    const formData1: FormData = new FormData();
    formData1.append('file', fileToUpload);
    console.log(formData1);
    return this.http.post<Archivo>(endpoint1, formData1).pipe(
      tap(_ => this.log(`se ha subido el archivo ${fileToUpload.name}`)),
      catchError(this.handleError<any>('updateComentario'))
    );
  }

  public getArchivoPDF(ruta: string): Observable<any> {
    return this.http.get<any>(ruta, { responseType: 'blob' as 'json' })
      .pipe(tap(_ => this.log('Se recuperaron los documentos')),
        catchError(this.handleError<any>('No se pudieron recuperar los documentos')));
  }

  public downloadFile(route: string, filename: string): void {
    console.log('entró al log')
    this.http.get(route, { responseType: 'blob' as 'json' }).subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        if (filename)
          downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }

  public postArchivoProyecto(fileToUpload: File, cliente: number, proyecto: number): Observable<any> {
    const endpoint1 = `${this.rutaBase}upload/proyecto/${cliente},${proyecto}`;
    let formData1: FormData = new FormData();
    formData1.append('file', fileToUpload);
    console.log(formData1);
    return this.http.post(endpoint1, formData1).pipe();
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
