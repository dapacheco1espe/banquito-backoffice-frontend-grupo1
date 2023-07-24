import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeostructureCreateComponent } from './geostructure-create.component';
import { GeostructureCreateRoutingModule } from './geostructure-create-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [CommonModule, FormsModule, GeostructureCreateRoutingModule],
})
export class GeostructureCreateModule {}
