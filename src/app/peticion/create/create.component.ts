import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  errors: any = null;
  selectedFile: File | null = null; // Para almacenar la imagen

  constructor(
    private fb: FormBuilder,
    private peticionService: PeticionService,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      destinatario: ['', Validators.required],
      categoria_id: ['', Validators.required]
      // Otros campos si es necesario
    });
  }

  ngOnInit(): void {}

  // Método para capturar el archivo de imagen
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      // Crear un FormData para enviar los datos junto con la imagen
      const formData = new FormData();
      formData.append('titulo', this.createForm.get('titulo')?.value);
      formData.append('descripcion', this.createForm.get('descripcion')?.value);
      formData.append('destinatario', this.createForm.get('destinatario')?.value);
      formData.append('categoria_id', this.createForm.get('categoria_id')?.value);
      if (this.selectedFile) {
        formData.append('imagen', this.selectedFile);
      }

      this.peticionService.create(formData).subscribe({
        next: (res) => {
          console.log('Petición creada', res);
        },
        error: (err) => {
          console.error('Error al crear la petición', err);
          this.errors = err.error;
        },
        complete: () => {
          this.createForm.reset();
          this.selectedFile = null;
          this.router.navigate(['/peticion']);
        }
      });
    } else {
      console.log('Formulario no válido', this.createForm.errors);
    }
  }
}
