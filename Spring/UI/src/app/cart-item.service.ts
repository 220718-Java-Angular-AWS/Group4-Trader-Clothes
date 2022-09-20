import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCartItems } from './create-cart-item';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CartItems } from './cart-items';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  baseurl = 'http://localhost:8080/cartItem/';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  createCartItem(data: CreateCartItems): Observable<CreateCartItems> {
    console.log("CART ITEM SERVICE ... create cart item");
    return this.http.post<CreateCartItems>(this.baseurl, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),

      )
  }

  GetCartItembyId(id: number): Observable<CartItems> {
    return this.http.get<CartItems>(this.baseurl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }


  GetAllCartItemsByCartId(id: number): Observable<CartItems[]> {
    console.log("GET CCCC: ", id)
    return this.http.get<CartItems[]>(this.baseurl + "getCartItemsByCartId/" + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  GetAllCartItems(): Observable<CartItems> {
    return this.http.get<CartItems>(this.baseurl)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  DeleteCartItems(id: number) {
    return this.http.delete<CartItems>(this.baseurl + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }







  // error handling
  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
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
