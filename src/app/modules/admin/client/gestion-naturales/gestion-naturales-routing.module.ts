import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionNaturalesComponent } from './gestion-naturales.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { PhoneComponent } from './create/phone/phone.component';
import { AddressComponent } from './create/address/address.component';


const routes: Routes = [
  {path:'',
  component:GestionNaturalesComponent
},
{path: 'create', component: CreateComponent},
{path: 'update/:typeDocumentId/:documentId', component: UpdateComponent},
{path: 'delete/:typeDocumentId/:documentId', component: DeleteComponent},
{path: 'createPhone/:typeDocumentId/:documentId', component: PhoneComponent},
{path: 'createAddress/:typeDocumentId/:documentId', component: AddressComponent},


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionNaturalesRoutingModule { }
