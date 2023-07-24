import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from 'app/shared/shared.module';
import { LocationComponent } from './location.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [LocationComponent],
    imports: [
        SharedModule,
        LocationRoutingModule,
        MatTabsModule,
        HttpClientModule,
        CommonModule,
    ],
})
export class LocationModule {}
