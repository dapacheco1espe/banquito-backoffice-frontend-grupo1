import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location.component';
import { LocationCreateComponent } from './location-create/location-create.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';

const routes: Routes = [
    {
        path: '',
        component: LocationComponent,
    },
    { path: 'create', component: LocationCreateComponent },
    { path: 'detail/:uuid', component: LocationDetailComponent },
    // { path: 'update/:id/:prov/:cant', component: AgencyUpdateComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LocationRoutingModule {}
