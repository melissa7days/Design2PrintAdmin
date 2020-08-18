import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../../Models/category';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  rootUrl = environment.design2printApiUrl;
  paramCategory = 'category';
  paramCategoryById = '/getCategoryById';
  categoryId = '?categoryId=';
  categoryUpdateDeleteId = '?id=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  addCategory(category:Category):Observable<any>{
    return this.http.post<any>(`${this.rootUrl}${this.paramCategory}`,category,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.rootUrl}${this.paramCategory}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getCategoryById(categoryId:number):Observable<Category>{
    return this.http.get<Category>(`${this.rootUrl}${this.paramCategory}${this.paramCategoryById}${this.categoryId}${categoryId}`,this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleCrudError));
  }

  updateCategory(categoryId,category:Category): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramCategory}${this.categoryUpdateDeleteId}${categoryId}`,category,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deleteCategory(categoryId:number){
    return this.http.delete(`${this.rootUrl}${this.paramCategory}${this.categoryUpdateDeleteId}${categoryId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
}
