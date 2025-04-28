import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Evento {
  icono: string;
  tipoEvento: string;
  nombreEvento: string;
  detallesEvento: string;
  botonTexto: string;
}
@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {}

  eventoEspecial: Evento = {
    icono: '/assets/LOGO.png',
    tipoEvento: 'Próximo evento',
    nombreEvento: 'Concierto benéfico CDMX',
    detallesEvento: 'Sábado 15 de junio, 18:00 hrs. Auditorio Nacional. Acceso especial para asistentes registrados.',
    botonTexto: 'Crear reservación'
  };
  irAReservaciones() {
    this.router.navigate(['/mis-reservas']);
  }
}
