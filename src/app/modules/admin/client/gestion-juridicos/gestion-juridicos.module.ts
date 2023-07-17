import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionJuridicosRoutingModule } from './gestion-juridicos-routing.module';
import { FormsModule } from '@angular/forms';
import { GestionJuridicosComponent } from './gestion-juridicos.component';



@NgModule({
  declarations: [
    GestionJuridicosComponent
   

  ],
  imports: [
    CommonModule,
    GestionJuridicosRoutingModule,
    FormsModule
  ]
})
export class GestionJuridicosModule { }
