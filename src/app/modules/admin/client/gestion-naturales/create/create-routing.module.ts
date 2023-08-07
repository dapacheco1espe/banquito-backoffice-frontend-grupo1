import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create.component';
import { PhoneComponent } from './phone/phone.component';
import { AddressComponent } from './address/address.component';

const routes: Routes = [
  {path:'',
  component:CreateComponent
},
{path: 'createPhone/:typeDocumentId/:documentId', component: PhoneComponent},
{path: 'createAddress/:typeDocumentId/:documentId', component: AddressComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
