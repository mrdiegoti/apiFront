import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  peticionId!: number;
  errors: any = null;
  // Propiedad para almacenar la imagen seleccionada
  selectedImage: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private peticionService: PeticionService
  ) {
    this.editForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      destinatario: ['', Validators.required],
      categoria_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.peticionId = Number(this.route.snapshot.paramMap.get('id'));
    this.peticionService.getById(this.peticionId).subscribe((data: Peticion) => {
      this.editForm.patchValue(data);
    });
  }

  // Método para capturar el archivo seleccionado
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }
  

  onSubmit(): void {
    if (this.editForm.valid) {
      const formData = new FormData();
      // Agrega _method para que Laravel lo interprete como PUT
      formData.append('_method', 'PUT');
      
      // Agrega los campos del formulario
      formData.append('titulo', this.editForm.get('titulo')?.value);
      formData.append('descripcion', this.editForm.get('descripcion')?.value);
      formData.append('destinatario', this.editForm.get('destinatario')?.value);
      formData.append('categoria_id', this.editForm.get('categoria_id')?.value);
      
      // Agrega la imagen si se ha seleccionado
      if (this.selectedImage) {
        formData.append('imagen', this.selectedImage);
      }
      
      // (Opcional) Para depurar, imprime el contenido del FormData:
      for (let pair of (formData as any).entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      this.peticionService.update(this.peticionId, formData).subscribe({
        next: (res) => {
          console.log('Petición actualizada', res);
        },
        error: (err) => {
          console.error('Error al actualizar la petición', err);
          this.errors = err.error;
        },
        complete: () => {
          this.router.navigate(['/peticion']);
        }
      });
    } else {
      console.log('Formulario no válido', this.editForm.errors);
    }
  }
  
}
