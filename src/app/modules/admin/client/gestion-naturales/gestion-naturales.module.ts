import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';

import { GestionNaturalesRoutingModule } from './gestion-naturales-routing.module';
import { GestionNaturalesComponent } from './gestion-naturales.component';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    GestionNaturalesComponent,
   

  ],
  imports: [
    SharedModule,
    CommonModule,
    GestionNaturalesRoutingModule,
    MatIconModule,
   
    
  ]
})
export class GestionNaturalesModule { }
