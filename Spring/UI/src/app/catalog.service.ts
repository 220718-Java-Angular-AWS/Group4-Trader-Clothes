import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Catalog } from './catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  baseurl = 'http://localhost:8080/catalog/';
  
  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  Createcatalog(data: any): Observable<Catalog> {
    return this.http.post<Catalog>(this.baseurl , JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }  

    // GET by id
    GetcatalogbyId(itemId: number): Observable<Catalog> {
      return this.http.get<Catalog>(this.baseurl + itemId)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    }

     // GET ALL
  Getcatalog(): Observable<Catalog> {
    return this.http.get<Catalog>(this.baseurl)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
 // DELETE by id 
 DeletecatalogDetails(itemId: number){
  return this.http.delete<Catalog>(this.baseurl + itemId, this.httpOptions)
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