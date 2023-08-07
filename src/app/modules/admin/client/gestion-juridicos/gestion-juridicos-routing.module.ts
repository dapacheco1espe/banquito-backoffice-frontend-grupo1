import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionJuridicosComponent } from './gestion-juridicos.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { MemberComponent } from './create/member/member.component';
import { UpdatememberComponent } from './create/updatemember/updatemember.component';



const routes: Routes = [
  {path:'',
  component:GestionJuridicosComponent
},
{path: 'createRole/:groupName', component: UpdatememberComponent},
{path: 'create', component: CreateComponent},
{path: 'update/:uniqueKey/:groupName', component: UpdateComponent},
{path: 'delete/:uniqueKey', component: DeleteComponent},
{path: 'createMember/:groupName/:uniqueKey', component: MemberComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionJuridicosRoutingModule { }
