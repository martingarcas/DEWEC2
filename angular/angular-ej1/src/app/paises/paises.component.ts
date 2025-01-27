import { Component } from '@angular/core';
import { PaisesService } from '../paises.service';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-paises',
  imports: [FormsModule ,NgFor],
  templateUrl: './paises.component.html',
  styleUrl: './paises.component.css'
})
export class PaisesComponent implements OnInit{

  pais:String;
  listaPaises:any[];
  constructor(private paises:PaisesService) { 
    this.pais = "";
    this.listaPaises=[];
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
