import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { Finishing } from 'src/app/Models/finishing';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinishingService {

  rootUrl = environment.design2printApiUrl;
  paramFinishing = 'finishing';
  paramFinishingById = '/getFinishingById';
  finishingId = '?finishingId=';
  finishingUpdateDeleteId = '?id=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  addFinishing(finishing: Finishing):Observable<any>{
    return this.http.post<any>(`${this.rootUrl}${this.paramFinishing}`,finishing,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  getFinishing(): Observable<Finishing[]>{
    return this.http.get<Finishing[]>(`${this.rootUrl}${this.paramFinishing}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getFinishingById(finishingId:number):Observable<Finishing>{
    return this.http.get<Finishing>(`${this.rootUrl}${this.paramFinishing}${this.paramFinishingById}${this.finishingId}${finishingId}`,this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleCrudError));
  }

  updateFinishing(finishingId,finishing:Finishing): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramFinishing}${this.finishingUpdateDeleteId}${finishingId}`,finishing,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deleteFinishing(finishingId:number){
    return this.http.delete(`${this.rootUrl}${this.paramFinishing}${this.finishingUpdateDeleteId}${finishingId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
}
