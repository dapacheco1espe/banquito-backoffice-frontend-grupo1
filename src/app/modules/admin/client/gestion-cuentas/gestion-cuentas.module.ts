import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionCuentasRoutingModule } from './gestion-cuentas-routing.module';
import { GestionCuentasComponent } from './gestion-cuentas.component';


@NgModule({
  declarations: [
    GestionCuentasComponent
  ],
  imports: [
    CommonModule,
    GestionCuentasRoutingModule
  ]
})
export class GestionCuentasModule { }
