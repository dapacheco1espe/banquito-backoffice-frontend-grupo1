import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionJuridicosComponent } from './gestion-juridicos.component';
import { CreateComponent } from './create/create.component';



const routes: Routes = [
  {path:'',
  component:GestionJuridicosComponent
},
{path: 'create', component: CreateComponent},





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionJuridicosRoutingModule { }
