import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { ProductTypeQuantity } from 'src/app/Models/product-type-quantity';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductTypeQuantityViewModel } from 'src/app/Models/ViewModels/ProductTypeQuantityViewModel';
import { ProductViewModel } from 'src/app/Models/ViewModels/ProductViewModel';
import { ProductType } from 'src/app/Models/product-type';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeQuantityService {
  
  rootUrl = environment.design2printApiUrl;
  paramProductTypeQuantity = 'productTypeQuantity';
  paramProductTypeQuantityById = '/getProQuantityById';
  paramGetAll= '/getAllProductTypeQuantity';
  productTypeQuantityId = '?productTypeQuantityId=';
  productTypeQuantityUpdateDeleteId = '?id=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  addProductTypeQuantity(productTypeQuantity: ProductTypeQuantity){
    return this.http.post(`${this.rootUrl}${this.paramProductTypeQuantity}`,productTypeQuantity, this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  getProductTypeQuantity():Observable<ProductTypeQuantityViewModel[]>{
    return this.http.get<ProductTypeQuantityViewModel[]>(`${this.rootUrl}${this.paramProductTypeQuantity}${this.paramGetAll}`)
    .pipe(catchError(this.errorHandler.handleCrudError));
  }

  getProductById(productTypeQuantityId:number):Observable<ProductTypeQuantity>{
    return this.http.get<ProductTypeQuantity>(`${this.rootUrl}${this.paramProductTypeQuantity}${this.paramProductTypeQuantityById}${this.productTypeQuantityId}${productTypeQuantityId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  updateProductTypeQuantity(productTypeQuantityId:number, productTypeQuantity:ProductTypeQuantity){
    return this.http.put(`${this.rootUrl}${this.paramProductTypeQuantity}${this.productTypeQuantityUpdateDeleteId}${productTypeQuantityId}`,productTypeQuantity)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  deleteProductTypeQuantity(productTypeQuantityId:number){
    return this.http.delete(`${this.rootUrl}${this.paramProductTypeQuantity}${this.productTypeQuantityUpdateDeleteId}${productTypeQuantityId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }
}
