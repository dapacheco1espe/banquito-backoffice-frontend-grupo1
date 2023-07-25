import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from 'app/shared/shared.module';
import { LocationComponent } from './location.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationCreateComponent } from './location-create/location-create.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { LocationUpdateComponent } from './location-update/location-update.component';

@NgModule({
    declarations: [LocationComponent, LocationCreateComponent, LocationDetailComponent, LocationUpdateComponent],
    imports: [
        SharedModule,
        LocationRoutingModule,
        MatTabsModule,
        HttpClientModule,
        CommonModule,
    ],
})
export class LocationModule {}
