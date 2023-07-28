import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyCreateComponent } from './agency-create.component';
import { AgencyCreateRoutingModule } from './agency-create-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [CommonModule, FormsModule, AgencyCreateRoutingModule],
})
export class AgencyCreateModule {}
