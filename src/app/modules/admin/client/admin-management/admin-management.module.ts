import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminManagementRoutingModule } from './admin-management-routing.module';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from 'app/shared/shared.module';
import { AdminManagementComponent } from './admin-management.component';

@NgModule({
    declarations: [AdminManagementComponent],
    imports: [SharedModule, AdminManagementRoutingModule, MatTabsModule],
})
export class AdminManagementModule {}
