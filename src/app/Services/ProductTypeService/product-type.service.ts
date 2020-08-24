import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { ProductType } from 'src/app/Models/product-type';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  rootUrl = environment.design2printApiUrl;
  paramProductType = 'producttype';
  paramProductTypeById = '/getProductTypeById';
  productTypeId = '?productTypeId=';
  productTypeUpdateDeleteId = '?id=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  addProductType(producttype: ProductType):Observable<any>{
    return this.http.post<any>(`${this.rootUrl}${this.paramProductType}`,producttype,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  getProductType():Observable<ProductType[]>{
    return this.http.get<ProductType[]>(`${this.rootUrl}${this.paramProductType}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getProductTypeById(productTypeId:number):Observable<ProductType>{
    return this.http.get<ProductType>(`${this.rootUrl}${this.paramProductType}${this.paramProductTypeById}${this.productTypeId}${productTypeId}`,this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleCrudError));
  }

  updateProductType(productTypeId,productType:ProductType):Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramProductType}${this.productTypeUpdateDeleteId}${productTypeId}`,productType,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deleteProductType(productTypeId:number){
    return this.http.delete(`${this.rootUrl}${this.paramProductType}${this.productTypeUpdateDeleteId}${productTypeId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
}
