import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyDetailComponent } from './agency-detail.component';
import { AgencyDetailRoutingModule } from './agency-detail-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AgencyDetailComponent],
    imports: [CommonModule, FormsModule, AgencyDetailRoutingModule],
})
export class AgencyDetailModule {}
