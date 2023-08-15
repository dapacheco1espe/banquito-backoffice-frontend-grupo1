import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PhoneRoutingModule } from './phone-routing.module';
import { PhoneComponent } from './phone.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PhoneComponent
  ],
  imports: [
    CommonModule,
    PhoneRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class PhoneModule { }
