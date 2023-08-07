import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    // Home Module
    {
        path: '',
        loadChildren: () =>
            import('app/modules/admin/home/home.module').then(
                (m) => m.HomeModule
            ),
    },
    // Admin Management Options
    {
        path: 'admin-management',
        loadChildren: () =>
            import(
                'app/modules/admin/admin-management/admin-management.module'
            ).then((m) => m.AdminManagementModule),
    },
    //Agency Module
    {
        path: 'agency',
        loadChildren: () =>
            import('app/modules/admin/agency/agency.module').then(
                (m) => m.AgencyModule
            ),
    },
    // Geostructure Module
    {
        path: 'geostructure',
        loadChildren: () =>
            import('app/modules/admin/geostructure/geostructure.module').then(
                (m) => m.AgencyModule
            ),
    },
    // Location Module
    {
        path: 'location',
        loadChildren: () =>
            import('app/modules/admin/location/location.module').then(
                (m) => m.LocationModule
            ),
    },
    // Gestion Module
    // {
    //     path: 'gestion',
    //     loadChildren: () =>
    //         import('app/modules/admin/gestion/gestion.module').then(
    //             (m) => m.GestionModule
    //         ),
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}