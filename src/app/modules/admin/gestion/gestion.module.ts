import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRoutingModule } from './gestion-routing.module';
import { GestionComponent } from './gestion.component';
import { GestionNaturalesComponent } from '../client/gestion-naturales/gestion-naturales.component';
import { GestionJuridicosComponent } from '../client/gestion-juridicos/gestion-juridicos.component';
import { GestionRolesComponent } from '../client/gestion-roles/gestion-roles.component';
import {MatIconModule} from '@angular/material/icon';
import { CreateComponent } from '../client/gestion-naturales/create/create.component';


@NgModule({

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
    GestionComponent,
    GestionNaturalesComponent,
    GestionJuridicosComponent,
    GestionRolesComponent,
    CreateComponent
  
  ],
  imports: [
    CommonModule,
    GestionRoutingModule,
    MatIconModule,
  ]
})
export class GestionModule { }
