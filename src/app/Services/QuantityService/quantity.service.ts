import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { environment } from 'src/environments/environment';
import { Quantity } from 'src/app/Models/quantity';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuantityService {

  rootUrl = environment.design2printApiUrl;
  paramQuantity = 'quantity';
  paramQuantityById = '/getQuantityById';
  quantityId = '?quantityId=';
  quantityUpdateDeleteId = '?id=';
  
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  addQuantity(quantity:Quantity):Observable<any>{
    return this.http.post<any>(`${this.rootUrl}${this.paramQuantity}`,quantity,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  getQuantity(): Observable<Quantity[]>{
    return this.http.get<Quantity[]>(`${this.rootUrl}${this.paramQuantity}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getQuantityById(quantityId:number):Observable<Quantity>{
    return this.http.get<Quantity>(`${this.rootUrl}${this.paramQuantity}${this.paramQuantityById}${this.quantityId}${quantityId}`,this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleCrudError));
  }

  updateQuantity(quantityId,quantity:Quantity): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramQuantity}${this.quantityUpdateDeleteId}${quantityId}`,quantity,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deleteQuantity(quantityId:number){
    return this.http.delete(`${this.rootUrl}${this.paramQuantity}${this.quantityUpdateDeleteId}${quantityId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
}

