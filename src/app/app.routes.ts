import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ParqueaderosComponent } from './pages/parqueaderos/parqueaderos.component';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
import { AdminParqueaderosComponent } from './pages/admin-parqueaderos/admin-parqueaderos.component';
import { RegistroEntradaComponent } from './registro-entrada/registro-entrada.component';
import { RegistroSalidaComponent } from './registro-salida/registro-salida.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'parqueaderos', component: ParqueaderosComponent },
  { path: 'mis-reservas', component: MisReservasComponent },
  { path: 'admin-parqueaderos', component: AdminParqueaderosComponent },
  { path: 'registro-entrada', component: RegistroEntradaComponent },
  { path: 'registro-salida', component: RegistroSalidaComponent },

];
