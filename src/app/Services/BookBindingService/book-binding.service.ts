import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { BookBinding } from 'src/app/Models/book-binding';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookBindingService {

  rootUrl = environment.design2printApiUrl;
  paramBookBinding = 'bookbinding';
  paramBookBindingById = '/getBookBindingById';
  bookBindingId = '?ookBindingId=';
  bookBindingUpdateDeleteId = '?id=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  addBookBinding(bookbinding: BookBinding):Observable<any>{
    return this.http.post<any>(`${this.rootUrl}${this.paramBookBinding}`,bookbinding,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  getBookBinding(): Observable<BookBinding[]>{
    return this.http.get<BookBinding[]>(`${this.rootUrl}${this.paramBookBinding}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getBookBindingById(bookBindingId:number):Observable<BookBinding>{
    return this.http.get<BookBinding>(`${this.rootUrl}${this.paramBookBinding}${this.paramBookBindingById}${this.bookBindingId}${bookBindingId}`,this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleCrudError));
  }

  updateBookBinding(bookBindingId,bookbinding:BookBinding): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramBookBinding}${this.bookBindingUpdateDeleteId}${bookBindingId}`,bookbinding,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deleteBookBinding(bookBindingId:number){
    return this.http.delete(`${this.rootUrl}${this.paramBookBinding}${this.bookBindingUpdateDeleteId}${bookBindingId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
}
