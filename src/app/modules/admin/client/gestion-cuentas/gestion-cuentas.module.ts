import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { GestionCuentasRoutingModule } from './gestion-cuentas-routing.module';
import { GestionCuentasComponent } from './gestion-cuentas.component';
@NgModule({
  declarations: [
    GestionCuentasComponent
  ],
  imports: [
    CommonModule,
    GestionCuentasRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class GestionCuentasModule { }
