import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-profesor',
  imports: [],
  templateUrl: './detalle-profesor.component.html',
  styleUrl: './detalle-profesor.component.css'
})
export class DetalleProfesorComponent {

  id:number;
  
  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }
}
