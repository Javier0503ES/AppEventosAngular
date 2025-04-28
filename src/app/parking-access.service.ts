import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingAccessService {

  private baseUrl = 'http://localhost:5003/ParkingAccessEndpoint';

  constructor(private http: HttpClient) {}

  addParkingAccess(idParking:number, licensePlateNumber: string): Observable<any> {

    const url = `${this.baseUrl}/AddParkingAccess?idParking=${idParking}&licensePlateNumber=${licensePlateNumber}`;
    return this.http.post<any>(url, {});

    }
    updateParkingAccess(idParking:number, licensePlateNumber: string): Observable<any> {

      const url = `${this.baseUrl}/UpdateParkingAccess?idParking=${idParking}&licensePlateNumber=${licensePlateNumber}`;
      return this.http.post<any>(url, {});
      }

}
