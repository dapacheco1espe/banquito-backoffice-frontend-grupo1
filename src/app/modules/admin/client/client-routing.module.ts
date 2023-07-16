import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { GestionComponent } from '../gestion/gestion.component';



const routes: Routes = [{
  path:'',
  component:ClientComponent
},
{
  path:'clientes',
component: GestionComponent

 },


 
  {
    path: 'gestion-naturales',
    loadChildren: () => import('app/modules/admin/client/gestion-naturales/gestion-naturales.module') .then(m => m.GestionNaturalesModule),
  },
  {
    path: 'gestion-juridicos',
    loadChildren: () => import('app/modules/admin/client/gestion-juridicos/gestion-juridicos.module') .then(m => m.GestionJuridicosModule),
  },
 
  {
    path: 'create-naturales',
    loadChildren: () => import('app/modules/admin/client/gestion-naturales/create/create.module') .then(m => m.CreateModule),
  },
  {
    path: 'detail-naturales',
    loadChildren: () => import('app/modules/admin/client/gestion-naturales/detail/detail.module') .then(m => m.DetailModule),
  },
  {
    path: 'edit-naturales',
    loadChildren: () => import('app/modules/admin/client/gestion-naturales/update/update.module') .then(m => m.UpdateModule),
  },
  {
    path: 'create-juridicos',
    loadChildren: () => import('app/modules/admin/client/gestion-juridicos/create/create.module') .then(m => m.CreateModule),
  },
  {
    path: 'edit-juridicos',
    loadChildren: () => import('app/modules/admin/client/gestion-juridicos/update/update.module') .then(m => m.UpdateModule),
  },
  {
    path: 'accounts',
    loadChildren: () => import('app/modules/admin/client/gestion-juridicos/accounts/accounts.module') .then(m => m.AccountsModule),
  },
  {
    path: 'create-accounts',
    loadChildren: () => import('app/modules/admin/client/gestion-juridicos/accounts/create/create.module') .then(m => m.CreateModule),
  },
  {
    path: 'edit-accounts',
    loadChildren: () => import('app/modules/admin/client/gestion-juridicos/accounts/update/update.module') .then(m => m.UpdateModule),
  },
  
  
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
