import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './Components/category/category.component';
import { ProductTypeComponent } from './Components/product-type/product-type.component';
import { ProductComponent } from './Components/product/product.component';
import { QuantityComponent } from './Components/quantity/quantity.component';
import { DesignServiceComponent } from './Components/design-service/design-service.component';
import { FinishedFormatComponent } from './Components/finished-format/finished-format.component';
import { MaterialComponent } from './Components/material/material.component';
import { ColorComponent } from './Components/color/color.component';
import { RefinementComponent } from './Components/refinement/refinement.component';
import { BookBindingComponent } from './Components/book-binding/book-binding.component';
import { FinishingComponent } from './Components/finishing/finishing.component';
import { PDFComponent } from './Components/pdf/pdf.component';
import { PagesComponent } from './Components/pages/pages.component';
import { DiscountComponent } from './Components/discount/discount.component';
import { ProductTypeQuantityComponent } from './Components/product-type-quantity/product-type-quantity.component';


const routes: Routes = [
  {path:'', component:CategoryComponent},
  {path:'design2print/category', component:CategoryComponent},
  {path:'design2print/producttype', component:ProductTypeComponent},
  {path:'design2print/product', component:ProductComponent},
  {path:'design2print/quantity', component:QuantityComponent},
  {path:'design2print/designService', component:DesignServiceComponent},
  {path:'design2print/finishedFormat', component:FinishedFormatComponent},
  {path:'design2print/material', component:MaterialComponent},
  {path:'design2print/color', component:ColorComponent},
  {path:'design2print/refinement', component:RefinementComponent},
  {path:'design2print/bookbinding', component:BookBindingComponent},
  {path:'design2print/finishing', component:FinishingComponent},
  {path:'design2print/pdf', component:PDFComponent},
  {path:'design2print/page', component:PagesComponent},
  {path:'design2print/discount', component:DiscountComponent},
  {path:'design2print/productTypeQuantity', component:ProductTypeQuantityComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
