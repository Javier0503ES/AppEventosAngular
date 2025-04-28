import { NgModule, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Parqueadero } from '../../models/parqueadero.model';
import { ReservationRequest, ReservationResponse } from '../../models/reservation.model';
import { ReservationServiceService } from '../../services/reservation-service.service';
import { ParkingServiceService } from '../../services/parking-service.service';

@Component({
  standalone: true,
  selector: 'app-mis-reservas',
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.css'
})
export class MisReservasComponent implements OnInit {

  placa: string = '';
  idParkingSeleccionado: number = 0;
  reservasFinalizadas: ReservationResponse[] = [];
  reservaActiva: ReservationResponse | null = null;
  mensaje: string = '';
  error: string = '';
  parkingsDisponibles: Parqueadero[] = [];
  createReservation: boolean = false;
  LugaresDisponibles: number = 0;

  constructor(
    private reservationServiceService: ReservationServiceService,
    private parkingServe: ParkingServiceService
  ) { }

  ngOnInit(): void {
    this.cargarParkings();
  }

  cargarParkings(): void {
    this.parkingServe.obtenerParqueaderos().subscribe({
      next: (data) => {
        this.parkingsDisponibles = data;
      },
      error: () => {
        this.error = 'No se pudieron cargar los estacionamientos.';
      }
    });
  }

  buscarReservas(): void {
    if (!this.placa.trim()) {
      this.error = 'Ingresa una placa válida.';
      return;
    }

    this.reservaActiva = null;
    this.reservationServiceService.obtenerReservasPorPlaca(this.idParkingSeleccionado, this.placa).subscribe({
      next: (data) => {


        this.reservaActiva = data.find(r => r.statusReservation === 0 || r.statusReservation === 1) || null;
        this.reservasFinalizadas = data.filter(r => r.statusReservation === 2);
        const _parqueadero = this.parkingsDisponibles.find(p => p.idParking === this.idParkingSeleccionado);
        this.LugaresDisponibles = _parqueadero ? _parqueadero.totalAvaliablePlace : 0;

        if (data.length === 0) {
          this.mensaje = 'Sin reservas registradas.';

        } else {
          this.mensaje = '';
        }
        this.createReservation = this.evaluarDisponibilidad();
        this.error = '';
      },
      error: () => {
        this.error = 'Error al consultar las reservas.';
      }
    });
  }

  reservar(): void {


    if (!this.placa.trim() || this.idParkingSeleccionado === null) {
      this.error = 'Debes ingresar todos los datos.';
      return;
    }

    if (this.reservaActiva) {
      this.error = 'Ya tienes una reserva vigente.';
      return;
    }

    const nuevaReserva: ReservationRequest = {
      licensePlateNumber: this.placa,
      idParking: this.idParkingSeleccionado
    };

    this.reservationServiceService.crearReserva(this.idParkingSeleccionado,this.placa).subscribe({
      next: (resp) => {
        if (resp) {
          this.mensaje = 'Reservación creada exitosamente.';
          this.error = '';
          this.createReservation = false;
          this.cargarParkings()
          this.buscarReservas();
        }
      },
      error: () => {
        this.error = 'No se pudo crear la reserva.';
      }
    });
  }

  GetLabetlStatus(reserva: ReservationResponse): string {
    switch (reserva.statusReservation) {
      case 0:
        return 'Vigente/Reservado';
      case 1:
        return 'Activo/En uso';
      case 2:
        return 'Finalizada';
      default:
        return 'Desconocido';
    }
  }
  onParkingChange(event: any): void {

    const _parqueadero = this.parkingsDisponibles.find(p => p.idParking === Number(event.target.value));

    this.LugaresDisponibles = _parqueadero ? _parqueadero.totalAvaliablePlace : 0;
    this.mensaje = (this.LugaresDisponibles==0)?'Sin lugares disponibles.':'';

    console.log('Lugares disponibles');
    console.log(this.LugaresDisponibles);

  }
  evaluarDisponibilidad(): boolean {

    const _parqueadero = this.parkingsDisponibles.find(p => p.idParking === Number(this.idParkingSeleccionado));

    this.LugaresDisponibles = _parqueadero ? _parqueadero.totalAvaliablePlace : 0;

    if (this.LugaresDisponibles > 0 && this.reservaActiva == null) {
      return true;
    }
    if (this.reservaActiva != null || this.LugaresDisponibles == 0) {
      return false;
    }
    return false;
  }
}
