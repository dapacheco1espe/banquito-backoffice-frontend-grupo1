import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { FormsModule } from '@angular/forms';
import { UpdatememberComponent } from './updatemember/updatemember.component';


@NgModule({
  declarations: [
    CreateComponent,
    UpdatememberComponent
  ],
  imports: [
    CommonModule, FormsModule,
    CreateRoutingModule

  ]
})
export class CreateModule { }
