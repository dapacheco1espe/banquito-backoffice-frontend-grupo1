import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidayComponent } from './holiday.component';
import { HolidayCreateComponent } from './holiday-create/holiday-create.component';

const routes: Routes = [
    {
        path: '',
        component: HolidayComponent,
    },
    { path: 'create', component: HolidayCreateComponent },
    // { path: 'detail/:id', component: AgencyDetailComponent },
    // { path: 'update/:id/:prov/:cant', component: AgencyUpdateComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HolidayRoutingModule {}
