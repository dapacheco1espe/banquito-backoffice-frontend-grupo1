import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { GestionNaturalesRoutingModule } from './gestion-naturales-routing.module';
import { GestionNaturalesComponent } from './gestion-naturales.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [GestionNaturalesComponent],
    imports: [
        SharedModule,
        CommonModule,
        GestionNaturalesRoutingModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class GestionNaturalesModule {}
