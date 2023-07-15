import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionNaturalesComponent } from './gestion-naturales.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  {path:'',
  component:GestionNaturalesComponent
},
{path: 'create', component: CreateComponent},
{path: 'detail/:id', component: DetailComponent},
{path: 'update/:id', component: UpdateComponent},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionNaturalesRoutingModule { }
