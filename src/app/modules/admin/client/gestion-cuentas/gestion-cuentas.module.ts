import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionCuentasRoutingModule } from './gestion-cuentas-routing.module';
import { GestionCuentasComponent } from './gestion-cuentas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    GestionCuentasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GestionCuentasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GestionCuentasModule { }
