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

  firmar(id: number, peticion: Peticion): void {
    // Verificar si el usuario es el creador
    if (peticion.user_id === this.currentUser?.id) {
      alert('El creador no puede firmar la petición');
      return;
    }

    // Verificar si el usuario ya ha firmado la petición
    if (peticion.firmantes && peticion.firmantes.some((f: any) => f.user_id === this.currentUser?.id)) {
      alert('No puedes volver a firmar la petición');
      return;
    }

    this.peticionService.firmar(id).subscribe({
      next: (data: any) => {
        console.log('Petición firmada con éxito:', data);
        this.loadPeticiones();
      },

    });
  }

  cambiarEstado(peticion: Peticion): void {
  const nuevoEstado = prompt('Introduce el nuevo estado (pendiente, aceptada, rechazada):', String(peticion.estado));
  
  if (!nuevoEstado || !['pendiente', 'aceptada', 'rechazada'].includes(nuevoEstado)) {
    alert('Estado no válido');
    return;
  }

  this.peticionService.cambiarEstado(peticion.id!, nuevoEstado).subscribe({
    next: () => {
      alert('Estado actualizado correctamente');
      this.ngOnInit(); // Recargar lista
    },
    error: (err) => {
      console.error('Error al cambiar estado:', err);
      alert('No tienes permiso o ocurrió un error');
    }
  });
}
}
