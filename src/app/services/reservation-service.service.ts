import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ReservationRequest, ReservationResponse } from '../models/reservation.model';
@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {

  private apiUrl = 'http://localhost:5000/api/reservations'; // Cambia el puerto si es diferente
  private _urlApi='http://localhost:5003';

  private baseUrl = 'http://localhost:5003/ReservationEndpoint';

  constructor(private http: HttpClient) {}

  obtenerReservasPorPlaca(idParking:number, placa: string): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.baseUrl}/GetReservationForLicensePlateNumberAsync?idParking=${idParking}&licensePlateNumber=${placa}`);
  }

  crearReserva(idParking: number, licensePlateNumber: string): Observable<any> {
    const url = `${this.baseUrl}/AddReservation?idParking=${idParking}&licensePlateNumber=${licensePlateNumber}`;
    return this.http.post<any>(url, {});
  }
}
