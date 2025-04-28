import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Parqueadero } from '../../models/parqueadero.model';
import { ParkingServiceService } from '../../services/parking-service.service';


@Component({
  standalone: true,
  selector: 'app-parqueaderos',
  imports: [CommonModule, FormsModule],
  templateUrl: './parqueaderos.component.html',
  styleUrl: './parqueaderos.component.css'
})
export class ParqueaderosComponent implements OnInit {

  parqueaderos: Parqueadero[] = [];
  cargando = true;
  error = '';
  parqueaderoDetalle: Parqueadero | null = null;

  constructor(private parkingServiceService: ParkingServiceService) {}

  ngOnInit(): void {
    this.obtenerParqueaderos();
  }

  obtenerParqueaderos(): void {
    this.parkingServiceService.obtenerParqueaderos().subscribe({
      next: (data) => {
        this.parqueaderos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar parqueaderos';
        this.cargando = false;
      }
    });
  }

  abrirDetalle(parqueadero: Parqueadero): void {
    this.parqueaderoDetalle = parqueadero;
  }

  cerrarDetalle(): void {
    this.parqueaderoDetalle = null;
  }
}
