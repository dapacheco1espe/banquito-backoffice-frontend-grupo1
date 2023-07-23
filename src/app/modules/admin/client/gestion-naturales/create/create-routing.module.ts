import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create.component';
import { PhoneComponent } from './phone/phone.component';

const routes: Routes = [
  {path:'',
  component:CreateComponent
},
{path: 'createPhone/:typeDocumentId/:documentId', component: PhoneComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
