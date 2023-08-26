import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { LocationCreateRoutingModule } from './location-create-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [CommonModule, FormsModule, LocationCreateRoutingModule],
})
export class LocationCreateModule {}
