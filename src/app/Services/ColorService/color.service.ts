import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { Color } from 'src/app/Models/color';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  rootUrl = environment.design2printApiUrl;
  paramColor = 'color';
  paramColorById = '/getColorById';
  colorId = '?colorId=';
  colorUpdateDeleteId = '?id=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  addColor(color: Color):Observable<any>{
    return this.http.post<any>(`${this.rootUrl}${this.paramColor}`,color,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  getColor(): Observable<Color[]>{
    return this.http.get<Color[]>(`${this.rootUrl}${this.paramColor}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getColorById(colorId:number):Observable<Color>{
    return this.http.get<Color>(`${this.rootUrl}${this.paramColor}${this.paramColorById}${this.colorId}${colorId}`,this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleCrudError));
  }

  updateColor(colorId,color:Color): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramColor}${this.colorUpdateDeleteId}${colorId}`,color,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deleteColor(colorId:number){
    return this.http.delete(`${this.rootUrl}${this.paramColor}${this.colorUpdateDeleteId}${colorId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
}
