import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseurl = 'http://localhost:8080/login';
  constructor(private http: HttpClient) { }

  // Http Headers
  // httpOptions: object = {
  //   observe: 'response',
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }
  
  reqTest(param: any): Observable<HttpResponse<Object>> {
    console.log("initiating POST request...");
    let observable: Observable<HttpResponse<Object>> = this.http.post(
      this.baseurl + '/auth',
      JSON.stringify(param),
      {
        observe: 'response',
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json'
          })
      }).pipe(retry(1), catchError(this.errorHandl));

    return observable;
  }

  // second attempt : changed so that it returns any that way can check the type in component 
  // Login1(login: Login): any {
  //   //return this.http.get<Users>(this.baseurl + '/auth')
  //   let loginattempt: Observable<HttpResponse<Users>> = this.http.post<Users>(this.baseurl + '/auth', JSON.stringify(login), /*this.httpOptions*/{ observe: 'response' }).pipe(retry(1), catchError(this.errorHandl))
  //   console.log("Login Attempt:", loginattempt)
  //   let authUser: HttpResponse<Users>;
  //   //loginattempt.subscribe((event) => {console.log("event: ", event)})
  //   loginattempt.subscribe((observableResponse) => {
  //     authUser = observableResponse;
  //     console.log(authUser);
  //   })
  //   return null;

  // }

  // first attempt 
  // Login1(login: Login): Observable<Users> {
  //   return this.http.get<Users>(this.baseurl + login)
  //   let loginattempt : Observable<Users> = this.http.post<Users>(this.baseurl, JSON.stringify(login), this.httpOptions).pipe(retry(1), catchError(this.errorHandl))
  //   loginattempt.subscribe((event) => {console.log(event)})
  //   console.log("Login Attempt:" + loginattempt)
  //   return loginattempt

  // }

  // Login2(Users: any){
  // return this.http.post<Users>(this.baseurl, Users, this.httpOptions)

  // }


  // error handling
  errorHandl(error: any) {
    console.log("Error handler invoked...");
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    alert("Bad username/password?")
    return throwError(errorMessage);
  }
}