import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { Pages } from 'src/app/Models/pages';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  rootUrl = environment.design2printApiUrl;
  paramPages = 'pages';
  paramPagesById = '/getPageById';
  pageId = '?pageId=';
  pageUpdateDeleteId = '?id=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  addPage(page: Pages):Observable<any>{
    return this.http.post<any>(`${this.rootUrl}${this.paramPages}`,page,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  getPage(): Observable<Pages[]>{
    return this.http.get<Pages[]>(`${this.rootUrl}${this.paramPages}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getPageById(pageId:number):Observable<Pages>{
    return this.http.get<Pages>(`${this.rootUrl}${this.paramPages}${this.paramPagesById}${this.pageId}${pageId}`,this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleCrudError));
  }

  updatePage(pageId,page:Pages): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramPages}${this.pageUpdateDeleteId}${pageId}`,page,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deletePage(pageId:number){
    return this.http.delete(`${this.rootUrl}${this.paramPages}${this.pageUpdateDeleteId}${pageId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
}
