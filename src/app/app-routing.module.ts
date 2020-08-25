import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './Components/category/category.component';
import { ProductTypeComponent } from './Components/product-type/product-type.component';
import { ProductComponent } from './Components/product/product.component';
import { QuantityComponent } from './Components/quantity/quantity.component';
import { DesignServiceComponent } from './Components/design-service/design-service.component';
import { FinishedFormatComponent } from './Components/finished-format/finished-format.component';
import { MaterialComponent } from './Components/material/material.component';


const routes: Routes = [
  {path:'', component:CategoryComponent},
  {path:'design2print/category', component:CategoryComponent},
  {path:'design2print/producttype', component:ProductTypeComponent},
  {path:'design2print/product', component:ProductComponent},
  {path:'design2print/quantity', component:QuantityComponent},
  {path:'design2print/designService', component:DesignServiceComponent},
  {path:'design2print/finishedFormat', component:FinishedFormatComponent},
  {path:'design2print/material', component:MaterialComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
