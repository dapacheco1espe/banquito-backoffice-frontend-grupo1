import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionJuridicosRoutingModule } from './gestion-juridicos-routing.module';
import { FormsModule } from '@angular/forms';
import { GestionJuridicosComponent } from './gestion-juridicos.component';
import { AccountsComponent } from './accounts/accounts.component';


@NgModule({
  declarations: [
    GestionJuridicosComponent,
    AccountsComponent
   

  ],
  imports: [
    CommonModule,
    GestionJuridicosRoutingModule,
    FormsModule
  ]
})
export class GestionJuridicosModule { }
