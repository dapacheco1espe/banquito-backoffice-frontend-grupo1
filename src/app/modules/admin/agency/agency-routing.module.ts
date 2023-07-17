import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyComponent } from './agency.component';
import { AgencyCreateComponent } from './agency-create/agency-create.component';
import { AgencyDetailComponent } from './agency-detail/agency-detail.component';
import { AgencyUpdateComponent } from './agency-update/agency-update.component';

const routes: Routes = [
    {
        path: '',
        component: AgencyComponent,
    },
    { path: 'create', component: AgencyCreateComponent },
    { path: 'detail/:id', component: AgencyDetailComponent },
    { path: 'update/:id', component: AgencyUpdateComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AgencyRoutingModule {}
