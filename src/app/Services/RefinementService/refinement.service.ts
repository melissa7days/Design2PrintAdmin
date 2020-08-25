import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Refinement } from 'src/app/Models/refinement';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RefinementService {

  rootUrl = environment.design2printApiUrl;
  paramRefinement = 'refinement';
  paramRefinementById = '/getRefinementById';
  refinementId = '?refinementId=';
  refinementUpdateDeleteId = '?id=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  addRefinement(refinement: Refinement):Observable<any>{
    return this.http.post<any>(`${this.rootUrl}${this.paramRefinement}`,refinement,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  getRefinement(): Observable<Refinement[]>{
    return this.http.get<Refinement[]>(`${this.rootUrl}${this.paramRefinement}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getRefinementById(refinementId:number):Observable<Refinement>{
    return this.http.get<Refinement>(`${this.rootUrl}${this.paramRefinement}${this.paramRefinementById}${this.refinementId}${refinementId}`,this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleCrudError));
  }

  updateRefinement(refinementId,refinement:Refinement): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramRefinement}${this.refinementUpdateDeleteId}${refinementId}`,refinement,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deleteRefinement(refinementId:number){
    return this.http.delete(`${this.rootUrl}${this.paramRefinement}${this.refinementUpdateDeleteId}${this.refinementId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
}
