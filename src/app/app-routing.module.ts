import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './Components/category/category.component';
import { ProductTypeComponent } from './Components/product-type/product-type.component';
import { ProductComponent } from './Components/product/product.component';
import { QuantityComponent } from './Components/quantity/quantity.component';


const routes: Routes = [
  {path:'', component:CategoryComponent},
  {path:'design2print/category', component:CategoryComponent},
  {path:'design2print/producttype', component:ProductTypeComponent},
  {path:'design2print/product', component:ProductComponent},
  {path:'design2print/quantity', component:QuantityComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
