import { Injectable } from '@angular/core';
//rxJS imports
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
//HTTP imports
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Camera } from './camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private cameraUrl = 'api/cameras';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    private http: HttpClient
  ) { }

  getCamera(id: number): Observable<Camera> {
    //Get an individual camera by it's id
    const url = `${this.cameraUrl}/${id}`;
    return this.http.get<Camera>(url)
    .pipe(catchError(this.errorHandling<Camera>(`getCamera problem (${id})`)));
  }

  getCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.cameraUrl)
    .pipe(catchError(this.errorHandling<Camera[]>('getCameras problem', [])));
  }

  //Error Handling based on an example from Angular documentation
  private errorHandling<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // log to console
      console.error(`${operation}: ${error}`);
      //Give back an empty result to avoid explosions
      return of(result as T);
    };
  }
}
