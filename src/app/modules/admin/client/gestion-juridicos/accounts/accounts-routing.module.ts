import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';

const routes: Routes = [
  {path:'',
  component:AccountsComponent
},
{path: 'create', component: CreateComponent},
{path: 'update/:id', component: UpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
