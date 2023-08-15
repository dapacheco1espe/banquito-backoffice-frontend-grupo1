import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidayUpdateComponent } from './holiday-update.component';

import { HolidayUpdateRoutingModule } from './holiday-update-routing.module';
import { FormsModule } from '@angular/forms';
import { Holiday } from '../holiday-model/holiday';

@NgModule({
    declarations: [],
    imports: [CommonModule, FormsModule, HolidayUpdateRoutingModule],
})
export class HolidayUpdateModule {}
