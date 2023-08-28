import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRoutingModule } from './update-routing.module';
import { UpdateComponent } from './update.component';
import { FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    UpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UpdateRoutingModule,
    
  ]
})
export class UpdateModule { }
