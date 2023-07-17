import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionJuridicosComponent } from './gestion-juridicos.component';



const routes: Routes = [
  {path:'',
  component:GestionJuridicosComponent
},





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionJuridicosRoutingModule { }
