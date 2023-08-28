import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionCuentasComponent } from './gestion-cuentas.component';

const routes: Routes = [    {
  path: '',
  component: GestionCuentasComponent
  },
  {
    path:'management',
    loadChildren: () => import('./management/management.module') .then( m => m.ManagementModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionCuentasRoutingModule { }
