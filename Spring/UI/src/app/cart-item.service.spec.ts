import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { CartItems } from './cart-items';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  baseurl = 'http://localhost:8080/cartitems/';
  
  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  Createcartitems(data: any): Observable<CartItems> {
    return this.http.post<CartItems>(this.baseurl , JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }  

    // GET by id
    GetcartitemsbyId(cartId: number): Observable<CartItems> {
      return this.http.get<CartItems>(this.baseurl + cartId)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    }

     // GET ALL
  Getcartitems(): Observable<CartItems> {
    return this.http.get<CartItems>(this.baseurl)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
 // DELETE by id 
 Deletecartitems(cartItemId: number){
  return this.http.delete<CartItems>(this.baseurl + cartItemId, this.httpOptions)
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