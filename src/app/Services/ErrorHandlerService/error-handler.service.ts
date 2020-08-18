import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }
  handleError(error: HttpErrorResponse) {
    console.log(error);
    // return of([]);

    if(error.status==200 ){
      console.log(error);
      return of([]);
    }
    else if(error.status==404){
      console.log(error);
      return of([{Status:"No record was found"}]);
    }
    else{
      console.log(error);
      return of([{error}]);
    }

  }

  handleCrudError(error:HttpErrorResponse){
    console.log(error.error)
    return of(error.error)
    console.log('Error status',error.message);
  }
}
