import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { Discount } from 'src/app/Models/discount';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  rootUrl = environment.design2printApiUrl;
  paramDiscount = 'discount';
  paramDiscountById = '/getDiscountById';
  discountId = '?discountId=';
  discountUpdateDeleteId = '?id=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  addDiscount(discount: Discount):Observable<any>{
    return this.http.post<any>(`${this.rootUrl}${this.paramDiscount}`,discount,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  getDiscount(): Observable<Discount[]>{
    return this.http.get<Discount[]>(`${this.rootUrl}${this.paramDiscount}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getDiscountById(discountId:number):Observable<Discount>{
    return this.http.get<Discount>(`${this.rootUrl}${this.paramDiscount}${this.paramDiscountById}${this.discountId}${discountId}`,this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleCrudError));
  }

  updateDiscount(discountId,discount:Discount): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramDiscount}${this.discountUpdateDeleteId}${discountId}`,discount,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deleteDiscount(discountId:number){
    return this.http.delete(`${this.rootUrl}${this.paramDiscount}${this.discountUpdateDeleteId}${discountId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
}
