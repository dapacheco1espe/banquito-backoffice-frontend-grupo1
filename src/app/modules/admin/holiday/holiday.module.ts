import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidayRoutingModule } from './holiday-routing.module';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from 'app/shared/shared.module';
import { HolidayComponent } from './holiday.component';
import { HttpClientModule } from '@angular/common/http';

import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { HolidayCreateComponent } from './holiday-create/holiday-create.component';

@NgModule({
    declarations: [HolidayComponent, HolidayCreateComponent],
    imports: [
        SharedModule,
        HolidayRoutingModule,
        MatTabsModule,
        HttpClientModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    exports: [MatDatepickerModule, MatNativeDateModule],
    providers: [MatDatepickerModule, MatNativeDateModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HolidayModule {}
