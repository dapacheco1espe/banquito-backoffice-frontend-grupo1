import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionJuridicosComponent } from './gestion-juridicos.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';



const routes: Routes = [
  {path:'',
  component:GestionJuridicosComponent
},
{path: 'create', component: CreateComponent},
{path: 'update/:uniqueKey/:groupName', component: UpdateComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionJuridicosRoutingModule { }
