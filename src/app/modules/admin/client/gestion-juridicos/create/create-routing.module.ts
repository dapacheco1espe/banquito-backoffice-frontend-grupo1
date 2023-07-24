import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { UpdatememberComponent } from './updatemember/updatemember.component';

const routes: Routes = [
  {path: 'createRole/:groupName', component: UpdatememberComponent},
  {path: 'createMember/:groupName/:uniqueKey', component: MemberComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
