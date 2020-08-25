import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../ErrorHandlerService/error-handler.service';
import { Material } from 'src/app/Models/material';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  rootUrl = environment.design2printApiUrl;
  paramMaterial = 'material';
  paramMaterialById = '/getMaterialById';
  materialId = '?materialId=';
  materialUpdateDeleteId = '?id=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  addMaterial(material: Material):Observable<any>{
    return this.http.post<any>(`${this.rootUrl}${this.paramMaterial}`,material,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  getMaterial(): Observable<Material[]>{
    return this.http.get<Material[]>(`${this.rootUrl}${this.paramMaterial}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getMaterialById(materialId:number):Observable<Material>{
    return this.http.get<Material>(`${this.rootUrl}${this.paramMaterial}${this.paramMaterialById}${this.materialId}${materialId}`,this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleCrudError));
  }

  updateMaterial(materialId,material:Material): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramMaterial}${this.materialUpdateDeleteId}${materialId}`,material,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deleteMaterial(materialId:number){
    return this.http.delete(`${this.rootUrl}${this.paramMaterial}${this.materialUpdateDeleteId}${materialId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
}
