import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from 'app/shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [HomeComponent],
    imports: [SharedModule, HomeRoutingModule, MatTabsModule],
})
export class HomeModule {}
