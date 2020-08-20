import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { Product } from 'src/app/Models/product';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductViewModel } from 'src/app/Models/ViewModels/ProductViewModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  rootUrl = environment.design2printApiUrl;
  paramProduct = 'product'
  paramProductById = '/getProductsById'
  paramGetAll = '/getAllProducts'
  productId = '?productId='
  productUpdateDeleteId = '?id='

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  addProduct(product: Product){
    return this.http.post(`${this.rootUrl}${this.paramProduct}`,product, this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  getProduct():Observable<ProductViewModel[]>{
    return this.http.get<ProductViewModel[]>(`${this.rootUrl}${this.paramProduct}${this.paramGetAll}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getProductById(productId:number):Observable<Product>{
    return this.http.get<Product>(`${this.rootUrl}${this.paramProduct}${this.paramProductById}${this.productId}${productId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  updateProduct(productId:number, product:Product){
    return this.http.put(`${this.rootUrl}${this.paramProduct}${this.productUpdateDeleteId}${productId}`,product)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  deleteProduct(productId:number){
    return this.http.delete(`${this.rootUrl}${this.paramProduct}${this.productUpdateDeleteId}${productId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }
}
