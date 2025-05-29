import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  peticiones: Peticion[] = [];
  currentUser: any = null;  // Información del usuario actual
  public baseUrl: string = 'http://127.0.0.1:8000';

  constructor(
    private peticionService: PeticionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Recuperar el usuario actual desde localStorage (asegúrate de que se guarda al iniciar sesión)
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
    this.loadPeticiones();
  }

  loadPeticiones(): void {
    this.peticionService.getAll().subscribe({
      next: (data: Peticion[]) => {
        this.peticiones = data;
      },
      error: (err) => {
        console.error('Error al cargar peticiones', err);
      }
    });
  }

  isOwnerOrAdmin(pet: Peticion): boolean {
    return pet.user_id === this.currentUser?.id || this.currentUser?.role_id === 1;
  }
  

  deletePeticion(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta petición?')) {
      this.peticionService.delete(id).subscribe({
        next: () => {
          this.loadPeticiones();
        },
        error: (err) => {
          console.error('Error al eliminar la petición', err);
        }
      });
    }
  }

  editPeticion(id: number): void {
    this.router.navigate(['/peticion', 'edit', id]);
  }

  firmar(id: number): void {
  this.peticionService.firmar(id).subscribe({
    next: (data: any) => {
      console.log('Petición firmada con éxito:', data);
      // Opcional: recargar las peticiones para ver el nuevo número de firmantes
      this.loadPeticiones();
    },
    error: (err: any) => {
      console.error('Error al firmar la petición', err);
      alert('No se pudo firmar. ¿Ya firmaste esta petición? ¿Estás autenticado?');
    }
  });
}
}
