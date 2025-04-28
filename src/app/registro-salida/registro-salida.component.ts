import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParkingAccessService } from '../parking-access.service';
import { Parqueadero } from '../models/parqueadero.model';
import { ParkingServiceService } from '../services/parking-service.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-registro-salida',
  templateUrl: './registro-salida.component.html',
  styleUrls: ['./registro-salida.component.css']
})
export class RegistroSalidaComponent implements OnInit {
  placa: string = '';
  idParking: number | null = null;
  mensaje: string = '';
  error: string = '';
  cargando: boolean = true;

    parkingsDisponibles: Parqueadero[] = [];

    constructor(private parkingAccessService: ParkingAccessService,private parkingService: ParkingServiceService,) {}

  ngOnInit(): void {

    this.obtenerParkings();

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

  registrarSalida() {

     if (this.placa && this.idParking) {

      this.parkingAccessService.updateParkingAccess(this.idParking!, this.placa).subscribe({
        next: (data) => {

          if(data) {
            console.log('Salida registrada:', data);
            this.mensaje = `La salida para el vehículo ${this.placa} en el estacionamiento ${this.idParking} ha sido registrada con éxito.`;
            this.error = '';
            this.placa ='';
            }else{

              this.error = 'Vehiculo aun no entra al estacionamiento';
              this.mensaje = '';
        }
        },
        error: (err) => {
          console.error('Error registrando salida', err);
          this.error = 'Error al registrar la salida.';
          this.mensaje = '';
        }
      });

     } else {
      this.error = 'Por favor, ingrese todos los datos.';
       this.mensaje = '';
    }
  }
}
