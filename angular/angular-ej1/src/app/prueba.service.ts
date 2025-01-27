import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  nombres:String[];
  constructor() { 
    this.nombres = [];
  }

  addNombre(nombre:String) {
    this.nombres.push(nombre);
  }

  clearNombre() {
    this.nombres=[];
  }
}
