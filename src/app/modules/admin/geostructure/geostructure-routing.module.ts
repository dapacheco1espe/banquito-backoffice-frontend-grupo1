import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeostructureComponent } from './geostructure.component';

const routes: Routes = [
    {
        path: '',
        component: GeostructureComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GeostructureRoutingModule {}
