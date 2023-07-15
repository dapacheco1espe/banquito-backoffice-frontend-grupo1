import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComponent } from './gestion.component';
import { createComponent } from '@angular/compiler/src/core';
import { CreateComponent } from '../client/gestion-naturales/create/create.component';


const routes: Routes = [
  {path:'',
  component:GestionComponent
},
{path:'create',
component:CreateComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
