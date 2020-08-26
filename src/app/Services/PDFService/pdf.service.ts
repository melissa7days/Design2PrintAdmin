import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { PDF } from 'src/app/Models/pdf';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PDFService {

  rootUrl = environment.design2printApiUrl;
  paramPDF = 'pdf';
  paramPDFById = '/getPDFById';
  pdfId = '?pdfId=';
  pdfUpdateDeleteId = '?id=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  addPDF(pdf: PDF):Observable<any>{
    return this.http.post<any>(`${this.rootUrl}${this.paramPDF}`,pdf,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  getPDF(): Observable<PDF[]>{
    return this.http.get<PDF[]>(`${this.rootUrl}${this.paramPDF}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getPDFById(pdfId:number):Observable<PDF>{
    return this.http.get<PDF>(`${this.rootUrl}${this.paramPDF}${this.paramPDFById}${this.pdfId}${pdfId}`,this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleCrudError));
  }

  updatePDF(pdfId,pdf:PDF): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramPDF}${this.pdfUpdateDeleteId}${pdfId}`,pdf,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deletePDF(pdfId:number){
    return this.http.delete(`${this.rootUrl}${this.paramPDF}${this.pdfUpdateDeleteId}${pdfId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
}
