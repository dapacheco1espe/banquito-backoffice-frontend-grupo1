import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyUpdateComponent } from './agency-update.component';

import { AgencyUpdateRoutingModule } from './agency-update-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [CommonModule, FormsModule, AgencyUpdateRoutingModule],
})
export class AgencyUpdateModule {}
