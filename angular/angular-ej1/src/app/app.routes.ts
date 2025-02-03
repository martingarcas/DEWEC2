import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PaisesComponent } from './paises/paises.component';
import { PaisDetalleComponent } from './pais-detalle/pais-detalle.component';

export const routes: Routes = [
	{ path: '', component: NavbarComponent, pathMatch: 'full' },
	{ path: 'paises', component: PaisesComponent},
	{ path: 'pais/:nombre', component: PaisDetalleComponent },
];
