import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeostructureRoutingModule } from './geostructure-routing.module';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from 'app/shared/shared.module';
import { GeostructureComponent } from './geostructure.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [GeostructureComponent],
    imports: [
        SharedModule,
        GeostructureRoutingModule,
        MatTabsModule,
        HttpClientModule,
        CommonModule,
    ],
})
export class AgencyModule {}
