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
    path: 'edit-naturales',
    loadChildren: () => import('app/modules/admin/client/gestion-naturales/update/update.module') .then(m => m.UpdateModule),
  },
  {
    path: 'delete-naturales',
    loadChildren: () => import('app/modules/admin/client/gestion-naturales/delete/delete.module') .then(m => m.DeleteModule),
  },
  {
    path: 'create-juridicos',
    loadChildren: () => import('app/modules/admin/client/gestion-juridicos/create/create.module') .then(m => m.CreateModule),
  },
  {
    path: 'update-juridicos',
    loadChildren: () => import('app/modules/admin/client/gestion-juridicos/update/update.module') .then(m => m.UpdateModule),
  },
  {
    path: 'delete-juridicos',
    loadChildren: () => import('app/modules/admin/client/gestion-juridicos/delete/delete.module') .then(m => m.DeleteModule),
  },
  {
    path: 'create-phone',
    loadChildren: () => import('app/modules/admin/client/gestion-naturales/create/phone/phone.module') .then(m => m.PhoneModule),
  },
  {
    path: 'create-address',
    loadChildren: () => import('app/modules/admin/client/gestion-naturales/create/address/address.module') .then(m => m.AddressModule),
  },
  {
    path: 'create-member',
    loadChildren: () => import('app/modules/admin/client/gestion-juridicos/create/member/member.module') .then(m => m.MemberModule),
  },
  {
    path: 'update-member',
    loadChildren: () => import('app/modules/admin/client/gestion-juridicos/create/updatemember/updatemember.module') .then(m => m.UpdatememberModule),
  },
  
  
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
