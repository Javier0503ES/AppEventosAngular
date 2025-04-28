import { NgModule,Component , OnInit} from '@angular/core';
import { ParkingServiceService } from '../../services/parking-service.service';
import { Parqueadero } from '../../models/parqueadero.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-admin-parqueaderos',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-parqueaderos.component.html',
  styleUrl: './admin-parqueaderos.component.css'
})
  export class AdminParqueaderosComponent implements OnInit {

    parqueaderos: Parqueadero[] = [];
    editando: Parqueadero | null = null;

    constructor(private parkingServiceService: ParkingServiceService) {}

    ngOnInit(): void {
      this.cargarParqueaderos();
    }

    cargarParqueaderos(): void {
      this.parkingServiceService.obtenerParqueaderos().subscribe({
        next: (data) => {
          this.parqueaderos = data;
        },
        error: () => console.error('Error al cargar parqueaderos')
      });
    }

    seleccionarParaEditar(parqueadero: Parqueadero) {
      this.editando = { ...parqueadero };
    }

    guardarCambios() {
      if (this.editando) {

         this.parkingServiceService.actualizarParqueadero(this.editando).subscribe({
           next: () => {
              alert('Parqueadero actualizado correctamente');
             this.editando = null;
             this.cargarParqueaderos();
           },
           error: () => console.error('Error al guardar cambios')
         });
      }
    }
    cancelarEdicion() {
      this.editando = null;
    }
}
