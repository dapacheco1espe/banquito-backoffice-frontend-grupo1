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
    path: 'gestion-roles',
    loadChildren: () => import('app/modules/admin/client/gestion-roles/gestion-roles.module') .then(m => m.GestionRolesModule),
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
  }

  
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
