import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PaisesComponent } from './paises/paises.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaisDetalleComponent } from './pais-detalle/pais-detalle.component';

@Component({
  selector: 'app-root',
  standalone: true, // Declaramos que este es un componente standalone
  imports: [RouterOutlet, NavbarComponent, PaisesComponent, PaisDetalleComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ya estamos empezando';
  nombre = 'Martin';
}
