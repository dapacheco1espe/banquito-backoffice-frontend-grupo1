import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidayCreateComponent } from './holiday-create.component';
import { HolidayCreateRoutingModule } from './holiday-create-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [CommonModule, FormsModule, HolidayCreateRoutingModule],
})
export class HolidayCreateModule {}
