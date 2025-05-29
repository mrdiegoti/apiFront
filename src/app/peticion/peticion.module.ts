import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeticionRoutingModule } from './peticion-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { IndexComponent } from './index/index.component';
import { MisPeticionesComponent } from './mispeticiones/mispeticiones.component';  // Usa el mismo nombre exportado
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FirmadasComponent } from './firmadas/firmadas.component';

@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    ViewComponent,
    IndexComponent,
    MisPeticionesComponent,
    FirmadasComponent
  ],
  imports: [
    CommonModule,      
    PeticionRoutingModule,
    ReactiveFormsModule,   
    FormsModule             
  ]
})
export class PeticionModule { }
