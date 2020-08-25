import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { DesignService } from 'src/app/Models/design-service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DesignServiceService {

  rootUrl = environment.design2printApiUrl;
  paramDesignService = 'designService';
  paramDesignServiceById = '/getDesignServiceById';
  designServiceId = '?designServiceId=';
  designServiceUpdateDeleteId = '?id=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  addDesignService(designService: DesignService):Observable<any>{
    return this.http.post<any>(`${this.rootUrl}${this.paramDesignService}`,designService,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  getDesignService(): Observable<DesignService[]>{
    return this.http.get<DesignService[]>(`${this.rootUrl}${this.paramDesignService}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getDesignServiceById(designServiceId:number):Observable<DesignService>{
    return this.http.get<DesignService>(`${this.rootUrl}${this.paramDesignService}${this.paramDesignServiceById}${this.designServiceId}${designServiceId}`,this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleCrudError));
  }

  updateDesignService(designServiceId,designService:DesignService): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramDesignService}${this.designServiceUpdateDeleteId}${designServiceId}`,designService,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deleteDesignService(designServiceId:number){
    return this.http.delete(`${this.rootUrl}${this.paramDesignService}${this.designServiceUpdateDeleteId}${designServiceId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
}
