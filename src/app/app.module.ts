import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './Components/category/category.component';
import { ProductTypeComponent } from './Components/product-type/product-type.component';
import { ProductComponent } from './Components/product/product.component';
import { QuantityComponent } from './Components/quantity/quantity.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DesignServiceComponent } from './Components/design-service/design-service.component'

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductTypeComponent,
    ProductComponent,
    QuantityComponent,
    DesignServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
