import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaisesComponent } from './paises/paises.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, PaisesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ya estamos empezando';
  nombre = "Martin";
}
