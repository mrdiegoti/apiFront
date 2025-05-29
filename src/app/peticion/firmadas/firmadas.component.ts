import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';

@Component({
  selector: 'app-firmadas',
  templateUrl: './firmadas.component.html',
  styleUrls: ['./firmadas.component.css']
})
export class FirmadasComponent implements OnInit {
  peticionesFirmadas: Peticion[] = [];
  baseUrl = 'http://127.0.0.1:8000';

  constructor(private peticionService: PeticionService) {}

  ngOnInit(): void {
    this.loadFirmadas();
  }

  loadFirmadas(): void {
    this.peticionService.getFirmadas().subscribe({
      next: (res) => {
        this.peticionesFirmadas = res;
      },
      error: (err) => {
        console.error('Error al obtener peticiones firmadas', err);
      }
    });
  }
}
