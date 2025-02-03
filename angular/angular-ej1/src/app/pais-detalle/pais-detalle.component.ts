import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisesService } from '../paises.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pais-detalle',
  standalone: true, // Si es un componente standalone
  imports: [CommonModule], // Asegúrate de importar CommonModule
  templateUrl: './pais-detalle.component.html',
  styleUrls: ['./pais-detalle.component.css']
})
export class PaisDetalleComponent implements OnInit {
  pais: any; // Aquí almacenaremos los detalles del país

  constructor(
    private paisesService: PaisesService,
    private route: ActivatedRoute // Para leer los parámetros de la URL
  ) { }

  ngOnInit(): void {
    // Obtener el nombre del país desde la URL
    const nombrePais = this.route.snapshot.paramMap.get('nombre');
    console.log('Nombre del país desde la URL:', nombrePais);
    // Usar el servicio para obtener los detalles del país
    if (nombrePais) {
      this.paisesService.getPais(nombrePais).subscribe((datos) => {
        this.pais = datos[0]; // Se espera que el servicio devuelva un arreglo
      });
    }
  }
}
