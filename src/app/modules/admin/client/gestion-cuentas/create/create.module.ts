import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createComponent } from '@angular/compiler/src/core';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CreateRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],exports:[ CreateComponent]

})
export class CreateModule { }
