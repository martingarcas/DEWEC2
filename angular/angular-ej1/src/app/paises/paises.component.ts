import { Component } from '@angular/core';
import { PaisesService } from '../paises.service';
import { RouterModule } from '@angular/router'; // Importar RouterModule aquí
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-paises',
  standalone: true, // Importante si estás usando componentes standalone
  imports: [FormsModule, NgFor, RouterModule], // Añadir RouterModule aquí
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  pais: string;
  listaPaises: any[];

  constructor(private paises: PaisesService) {
    this.pais = '';
    this.listaPaises = [];
  }

  ngOnInit() {
    this.paises.get().subscribe((datos) => {
      this.listaPaises = datos;
    });
  }

  traerPaises() {
    this.paises.get();
  }

  traerPais() {
    this.paises.getPais(this.pais);
  }
}
