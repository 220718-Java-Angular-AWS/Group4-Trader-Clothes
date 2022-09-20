import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Cart } from './cart';
import { CreateCart } from './createCart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseurl = 'http://localhost:8080/cart';

  constructor(private http: HttpClient) { }
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  Createcart(data: any): Observable<CreateCart> {
    console.log("MADE INTO CART SERVICE ")
    console.log("Data from create cart:", data)
    return this.http.post<CreateCart>(this.baseurl, JSON.stringify(data), this.httpOptions)
    .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }
  // GET by id
  GetcartbyId(cartId: number): Observable<Cart> {
    return this.http.get<Cart>(this.baseurl + cartId)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  GetCartByIdFalseCart(cartId: number): Observable<Cart> {
    return this.http.get<Cart>(this.baseurl + '/getCartByUserIdPurchaseIsFalse/' + cartId)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  // GET ALL
  Getcart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.baseurl)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  Updatecart(data: any): Observable<CreateCart> {
    console.log("MADE INTO CART SERVICE ")
    console.log("Data from create cart:", data)
    return this.http.put<CreateCart>(this.baseurl +"/", JSON.stringify(data), this.httpOptions)
    .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  
  // DELETE by id 
  Deletecart(cartId: number) {
    return this.http.delete<Cart>(this.baseurl + cartId, this.httpOptions)
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