import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CatalogDetails } from './catalogDetails';


@Injectable({
  providedIn: 'root'
})
export class catalogDetailsService {
  baseurl = 'http://localhost:8080/catalogDetails/';
  
  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  CreatecatalogDetails(data: any): Observable<CatalogDetails> {
    return this.http.post<CatalogDetails>(this.baseurl , JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }  

    // GET by id
    GetcatalogDetailsbyId(catalogDetailsId: number): Observable<CatalogDetails> {
      return this.http.get<CatalogDetails>(this.baseurl + catalogDetailsId)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    }

     // GET ALL
  GetcatalogDetails(): Observable<CatalogDetails> {
    return this.http.get<CatalogDetails>(this.baseurl)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
 // DELETE by id 
 DeletecatalogDetails(catalogDetailsId: number){
  return this.http.delete<CatalogDetails>(this.baseurl + catalogDetailsId, this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}
// error handling
errorHandl(error: any) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}
  
}