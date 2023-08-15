import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionCuentasModule } from './gestion-cuentas.module';
import { GestionCuentasComponent } from './gestion-cuentas.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [    {
  path: '',
  component: GestionCuentasComponent
},
{path: 'create', loadChildren:() => import('./create/create.module') .then(m =>m.CreateModule)},
{path: 'detail', loadChildren:() => import('./detail/detail.module') .then(m =>m.DetailModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionCuentasRoutingModule { }
