import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('app/modules/admin/home/home.module').then(
                (m) => m.HomeModule
            ),
    },
    {
        path: 'admin-management',
        loadChildren: () =>
            import(
                'app/modules/admin/admin-management/admin-management.module'
            ).then((m) => m.AdminManagementModule),
    },
    {
        path: 'agency',
        loadChildren: () =>
            import('app/modules/admin/agency/agency.module').then(
                (m) => m.AgencyModule
            ),
    },
    {
        path: 'geostructure',
        loadChildren: () =>
            import('app/modules/admin/geostructure/geostructure.module').then(
                (m) => m.AgencyModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
