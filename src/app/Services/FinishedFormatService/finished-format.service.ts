import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { FinishedFormat } from 'src/app/Models/finished-format';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinishedFormatService {

  rootUrl = environment.design2printApiUrl;
  paramFinishedFormat = 'finishedFormat';
  paramFinishedFormatById = '/getFinishedFormatById';
  finishedFormatId = '?finishedFormatId=';
  finishedFormatUpdateDeleteId = '?id=';
  
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  addFinishedFormat(finishedFormat: FinishedFormat):Observable<any>{
    return this.http.post<any>(`${this.rootUrl}${this.paramFinishedFormat}`,finishedFormat,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  getFinishedFormat(): Observable<FinishedFormat[]>{
    return this.http.get<FinishedFormat[]>(`${this.rootUrl}${this.paramFinishedFormat}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getFinishedFormatById(finishedFormattId:number):Observable<FinishedFormat>{
    return this.http.get<FinishedFormat>(`${this.rootUrl}${this.paramFinishedFormat}${this.paramFinishedFormatById}${this.finishedFormatId}${finishedFormattId}`,this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleCrudError));
  }

  updateFinishedFormat(finishedFormatId,finishedFormat:FinishedFormat): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramFinishedFormat}${this.finishedFormatUpdateDeleteId}${finishedFormatId}`,finishedFormat,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deleteFinishedFormat(finishedFormatId:number){
    return this.http.delete(`${this.rootUrl}${this.paramFinishedFormat}${this.finishedFormatUpdateDeleteId}${finishedFormatId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
}
