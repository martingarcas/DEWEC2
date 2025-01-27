import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PruebaService } from '../prueba.service';

@Component({
  selector: 'app-lista',
  imports: [NgFor, FormsModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit{
  nombres: String[];
  valor: String="";
  constructor(public service: PruebaService) {
    this.nombres=[];
    this.valor= "";
  }

  ngOnInit(): void {
    this.nombres=this.service.nombres;
  }

  annadir() {
    this.service.addNombre(this.valor);
  }

  vaciar() {
    this.service.clearNombre();
    this.nombres=this.service.nombres;
  }
}
