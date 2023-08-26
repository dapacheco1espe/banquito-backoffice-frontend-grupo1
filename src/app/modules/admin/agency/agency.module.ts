import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from 'app/shared/shared.module';
import { AgencyComponent } from './agency.component';
import { HttpClientModule } from '@angular/common/http';
import { AgencyCreateComponent } from './agency-create/agency-create.component';
import { AgencyUpdateComponent } from './agency-update/agency-update.component';

@NgModule({
    declarations: [AgencyComponent, AgencyCreateComponent, AgencyUpdateComponent],
    imports: [
        SharedModule,
        AgencyRoutingModule,
        MatTabsModule,
        HttpClientModule,
        CommonModule,
    ],
})
export class AgencyModule {}
