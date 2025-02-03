import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProfesorComponent } from './detalle-profesor.component';

describe('DetalleProfesorComponent', () => {
  let component: DetalleProfesorComponent;
  let fixture: ComponentFixture<DetalleProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
