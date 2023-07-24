import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location.component';

const routes: Routes = [
    {
        path: '',
        component: LocationComponent,
    },
    // { path: 'create', component: AgencyCreateComponent },
    // { path: 'detail/:id', component: AgencyDetailComponent },
    // { path: 'update/:id/:prov/:cant', component: AgencyUpdateComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LocationRoutingModule {}
