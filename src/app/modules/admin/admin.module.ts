import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { AgencyComponent } from './agency/agency.component';
import { GeostructureComponent } from './geostructure/geostructure.component';
import { LocationComponent } from './location/location.component';
import { HolidayComponent } from './holiday/holiday.component';

@NgModule({
    declarations: [],
    imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
