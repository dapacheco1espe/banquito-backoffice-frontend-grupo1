import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRoutingModule } from './gestion-routing.module';
import { GestionComponent } from './gestion.component';
import { GestionNaturalesComponent } from '../client/gestion-naturales/gestion-naturales.component';
import { GestionJuridicosComponent } from '../client/gestion-juridicos/gestion-juridicos.component';
import {MatIconModule} from '@angular/material/icon';




@NgModule({

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
    GestionComponent,
    GestionNaturalesComponent,
    GestionJuridicosComponent,

  
  ],
  imports: [
    CommonModule,
    GestionRoutingModule,
    MatIconModule,
  ]
})
export class GestionModule { }
