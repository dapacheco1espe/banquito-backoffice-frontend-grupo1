import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionNaturalesComponent } from './gestion-naturales.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  {path:'',
  component:GestionNaturalesComponent
},
{path: 'create', component: CreateComponent},
{path: 'update/:typeDocumentId/:documentId', component: UpdateComponent},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionNaturalesRoutingModule { }
