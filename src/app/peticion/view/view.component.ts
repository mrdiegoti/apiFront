import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  peticion!: Peticion;
  currentUser: any = null;
  error: any = null;

  constructor(
    private route: ActivatedRoute,
    private peticionService: PeticionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPeticion(id);
  }

  loadPeticion(id: number): void {
    this.peticionService.getById(id).subscribe({
      next: (data: Peticion) => {
        this.peticion = data;
      },
      error: (err) => {
        console.error('Error al cargar la petición', err);
        this.error = err.error;
      }
    });
  }

  isOwnerOrAdmin(): boolean {
    return this.peticion.user_id === this.currentUser?.id || this.currentUser?.role_id === 1;
  }
  
  

  deletePeticion(): void {
    if (confirm('¿Estás seguro de eliminar esta petición?')) {
      this.peticionService.delete(this.peticion.id!).subscribe({
        next: () => {
          this.router.navigate(['/peticion']);
        },
        error: (err) => {
          console.error('Error al eliminar la petición', err);
        }
      });
    }
  }

  editPeticion(): void {
    this.router.navigate(['/peticion/edit', this.peticion.id]);
  }
}
