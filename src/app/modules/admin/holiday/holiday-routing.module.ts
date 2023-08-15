import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidayComponent } from './holiday.component';
import { HolidayCreateComponent } from './holiday-create/holiday-create.component';
import { HolidayUpdateComponent } from './holiday-update/holiday-update.component';
import { HolidayDetailComponent } from './holiday-detail/holiday-detail.component';

const routes: Routes = [
    {
        path: '',
        component: HolidayComponent,
    },
    { path: 'create', component: HolidayCreateComponent },
    { path: 'detail/:uuid', component: HolidayDetailComponent },
    { path: 'update/:uuid', component: HolidayUpdateComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HolidayRoutingModule {}
