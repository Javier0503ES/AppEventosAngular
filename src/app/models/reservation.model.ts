export interface ReservationResponse {
  idReservation: number;
  idParking: number;
  licensePlateNumber: string;
  statusReservation:number;
  reservationDate:Date;
  parkingName :string;
}

export interface ReservationRequest {
  licensePlateNumber: string;
  idParking : number;
}
