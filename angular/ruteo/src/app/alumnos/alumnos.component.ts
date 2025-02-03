import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaAlumnosComponent } from '../lista-alumnos/lista-alumnos.component';
import { ListaGruposComponent } from '../lista-grupos/lista-grupos.component';

@Component({
  selector: 'app-alumnos',
  imports: [RouterOutlet, ListaAlumnosComponent, ListaGruposComponent],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent {

}
