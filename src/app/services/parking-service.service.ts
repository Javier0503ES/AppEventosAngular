import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parqueadero } from '../models/parqueadero.model';

@Injectable({
  providedIn: 'root'
})
export class ParkingServiceService {

  private _urlApi='http://localhost:5003';
  private apiUrl = 'http://localhost:5003/ParkingEndpoint/GetAllParking';
  private apiUrl2 = 'http://localhost:5003/ParkingEndpoint/GetAllProducts';


  constructor(private http: HttpClient) {}

  obtenerParqueaderos(): Observable<Parqueadero[]> {

    const _url = `${this._urlApi}/ParkingEndpoint/GetAllParking`;

    return this.http.get<Parqueadero[]>(_url);
  }

  actualizarParqueadero(parqueadero: Parqueadero): Observable<any> {


    const _url = `${this._urlApi}/ParkingEndpoint/UpdateparkingInfo`;

    return this.http.put(_url, parqueadero);
  }
}
