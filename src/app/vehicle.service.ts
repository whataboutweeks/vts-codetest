import { Injectable } from '@angular/core';
//rxJS imports
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
//HTTP imports
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Vehicle } from './vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private vehicleUrl = 'api/vehicles';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    private http: HttpClient
  ) { }

  getVehicle(id: number): Observable<Vehicle> {
    //Get an individual vehicle by it's id
    const url = `${this.vehicleUrl}/${id}`;
    return this.http.get<Vehicle>(url)
    .pipe(catchError(this.errorHandling<Vehicle>(`getVehicle problem (${id})`)));
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.vehicleUrl)
    .pipe(catchError(this.errorHandling<Vehicle[]>('getVehicles problem', [])));
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
