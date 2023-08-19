import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidayDetailComponent } from './holiday-detail.component';
import { HolidayDetailRoutingModule } from './holiday-detail-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [CommonModule, FormsModule, HolidayDetailRoutingModule],
})
export class HolidayCreateModule {}
