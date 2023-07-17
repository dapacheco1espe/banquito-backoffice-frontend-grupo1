import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeostructureComponent } from './geostructure.component';
import { GeostructureCreateComponent } from './geostructure-create/geostructure-create.component';

const routes: Routes = [
    {
        path: '',
        component: GeostructureComponent,
    },
    { path: 'create', component: GeostructureCreateComponent },
    // { path: 'detail/:id', component: GeostructureDetailComponent },
    // { path: 'update/:id', component: GeostructureUpdateComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GeostructureRoutingModule {}
