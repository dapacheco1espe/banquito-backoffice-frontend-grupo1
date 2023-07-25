import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [ClientComponent],
    imports: [
        SharedModule,
        CommonModule,
        ClientRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class ClientModule {}
