import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteRoutingModule } from './delete-routing.module';
import { DeleteComponent } from './delete.component';


@NgModule({
  declarations: [
    DeleteComponent
  ],
  imports: [
    CommonModule,
    DeleteRoutingModule
  ]
})
export class DeleteModule { }
