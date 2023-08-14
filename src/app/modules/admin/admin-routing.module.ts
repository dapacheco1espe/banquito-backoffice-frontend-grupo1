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
    //Holiday Module
    {
        path: 'holiday',
        loadChildren: () =>
            import('app/modules/admin/holiday/holiday.module').then(
                (m) => m.HolidayModule
            ),
    },
    // Gestion Module
    {
        path: 'gestion',
        loadChildren: () =>
            import('app/modules/admin/gestion/gestion.module').then(
                (m) => m.GestionModule
            ),
    },

    {
        path: 'gestion-naturales',
        loadChildren: () =>
            import(
                'app/modules/admin/client/gestion-naturales/gestion-naturales.module'
            ).then((m) => m.GestionNaturalesModule),
    },
    {
        path: 'gestion-juridicos',
        loadChildren: () =>
            import(
                'app/modules/admin/client/gestion-juridicos/gestion-juridicos.module'
            ).then((m) => m.GestionJuridicosModule),
    },

    {
        path: 'create-naturales',
        loadChildren: () =>
            import(
                'app/modules/admin/client/gestion-naturales/create/create.module'
            ).then((m) => m.CreateModule),
    },

    {
        path: 'edit-naturales',
        loadChildren: () =>
            import(
                'app/modules/admin/client/gestion-naturales/update/update.module'
            ).then((m) => m.UpdateModule),
    },
    {
        path: 'delete-naturales',
        loadChildren: () =>
            import(
                'app/modules/admin/client/gestion-naturales/delete/delete.module'
            ).then((m) => m.DeleteModule),
    },
    {
        path: 'create-juridicos',
        loadChildren: () =>
            import(
                'app/modules/admin/client/gestion-juridicos/create/create.module'
            ).then((m) => m.CreateModule),
    },
    {
        path: 'update-juridicos',
        loadChildren: () =>
            import(
                'app/modules/admin/client/gestion-juridicos/update/update.module'
            ).then((m) => m.UpdateModule),
    },
    {
        path: 'delete-juridicos',
        loadChildren: () =>
            import(
                'app/modules/admin/client/gestion-juridicos/delete/delete.module'
            ).then((m) => m.DeleteModule),
    },
    {
        path: 'create-phone',
        loadChildren: () =>
            import(
                'app/modules/admin/client/gestion-naturales/create/phone/phone.module'
            ).then((m) => m.PhoneModule),
    },
    {
        path: 'create-address',
        loadChildren: () =>
            import(
                'app/modules/admin/client/gestion-naturales/create/address/address.module'
            ).then((m) => m.AddressModule),
    },
    {
        path: 'create-member',
        loadChildren: () =>
            import(
                'app/modules/admin/client/gestion-juridicos/create/member/member.module'
            ).then((m) => m.MemberModule),
    },
    {
        path: 'update-member',
        loadChildren: () =>
            import(
                'app/modules/admin/client/gestion-juridicos/create/updatemember/updatemember.module'
            ).then((m) => m.UpdatememberModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
