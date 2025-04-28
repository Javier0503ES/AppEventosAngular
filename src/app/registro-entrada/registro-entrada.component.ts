import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParkingServiceService } from '../services/parking-service.service';
import { Parqueadero } from '../models/parqueadero.model';
import { ParkingAccessService } from '../parking-access.service';

@Component({
  standalone: true,
  imports: [CommonModule,FormsModule],
  selector: 'app-registro-entrada',
  templateUrl: './registro-entrada.component.html',
  styleUrls: ['./registro-entrada.component.css']
})
export class RegistroEntradaComponent implements OnInit {

  placa: string = '';
  idParking: number | null = null;
  mensaje: string = '';
  error: string = '';
  cargando: boolean = true;

  parkingsDisponibles: Parqueadero[] = [];

  constructor(private parkingService: ParkingServiceService, private parkingAccessService :ParkingAccessService ) {}

  ngOnInit(): void {
    this.obtenerParkings();
  }

  registrarEntrada() {
    if (this.placa && this.idParking) {
      this.addAcessParking();
      this.error = '';
    } else {
      this.error = 'Por favor, ingrese todos los dstos.';
      this.mensaje = '';
    }
  }

  obtenerParkings(): void {
    this.parkingService.obtenerParqueaderos().subscribe({
      next: (data) => {
        this.parkingsDisponibles = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando parqueaderos', err);
        this.error = 'Error al cargar parqueaderos.';
        this.cargando = false;
      }
    });
  }

  addAcessParking(): void {
    if (!this.placa.trim()) {
      this.error = 'Ingresa una placa válida.';
      return;
    }
    this.parkingAccessService.addParkingAccess(this.idParking!, this.placa).subscribe({
      next: (data) => {


        if(data===true){
          this.mensaje = `La entrada para el vehículo ${this.placa} en el estacionamiento ${this.idParking} ha sido registrada con éxito.`;
          this.placa = '';
        }else{
          this.error = `Sin datos de reserva del vehículo ${this.placa} en el estacionamiento ${this.idParking}`;
          this.mensaje = '';
        }
      },
      error: (err) => {
        console.error('Error al registrar la entrada', err);
        this.error = 'Error al registrar la entrada.';
        this.mensaje = '';
      }
    });
  }

}
