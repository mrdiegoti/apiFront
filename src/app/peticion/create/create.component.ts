import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PeticionService } from "../peticion.service";
import { Peticion } from "../peticion";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  errors: any = null;
  selectedFiles: File[] = []; // Para almacenar la imagen

  constructor(
    private fb: FormBuilder,
    private peticionService: PeticionService,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      titulo: ["", Validators.required],
      descripcion: ["", Validators.required],
      destinatario: ["", Validators.required],
      categoria_id: ["", Validators.required],
      // Otros campos si es necesario
    });
  }

  ngOnInit(): void {}

  // Método para capturar el archivo de imagen
  onFileChange(event: any): void {
    if (event.target.files) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      const formData = new FormData();
      formData.append("titulo", this.createForm.get("titulo")?.value);
      formData.append("descripcion", this.createForm.get("descripcion")?.value);
      formData.append(
        "destinatario",
        this.createForm.get("destinatario")?.value
      );
      formData.append(
        "categoria_id",
        this.createForm.get("categoria_id")?.value
      );

      this.selectedFiles.forEach((file) => {
        formData.append("imagen[]", file);
      });

      this.peticionService.create(formData).subscribe({
        next: (res) => {
          console.log("Petición creada", res);
        },
        error: (err) => {
          console.error("Error al crear la petición", err);
          this.errors = err.error;
        },
        complete: () => {
          this.createForm.reset();
          this.selectedFiles = [];
          this.router.navigate(["/peticion"]);
        },
      });
    }
  }
}
