import { Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { BaseComponent } from './base/base.component';
import { DetalleProfesorComponent } from './detalle-profesor/detalle-profesor.component';
import { ListaGruposComponent } from './lista-grupos/lista-grupos.component';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';

export const routes: Routes = [

	{ path: '', component: BaseComponent, pathMatch: 'full' },
	{ 
		path: 'alumnos', component: AlumnosComponent,
		children: [
			{path: '', component: ListaGruposComponent},
			{path: '2DAW', component: ListaAlumnosComponent}
		]
	},
	{ path: 'profesores', component: ProfesoresComponent },
	{ path: 'profesores/:id', component: DetalleProfesorComponent },

];
