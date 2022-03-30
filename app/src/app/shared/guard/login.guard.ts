import { Injectable } from '@angular/core';
import { User } from '../../shared/user';

import { Observable, observable,throwError  } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import{
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from 'express';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl='https://localhost:4200'
  constructor(private http:HttpClient, private router: Router){
    

  }
  userLogin(userData:any)
  {
    return this.http.post(this.apiUrl,userData)

  }
  isLogIn()
  {
    return localStorage.getItem('token')!=null;
  }
}
// // endPoint:string='http://localhost:4000/api';
// // headers=new HttpHeaders().set('Content-Type','application/json');
// // currentUser={};
// // constructor(private http:HttpClient,public router:Router){}

// // //sign-up
// // signUp(user:User):Observable<any>{
// //   let api=`${this.endPoint}/register`;
// //   return this.http.post(api,user).pipe(catchError(this.handleError));
// // }

// //sign in
// signIn(user:User){
//   return this.http
//   .post<any>(`${this.endPoint}/signin`,user)
//   .subscribe((res:any)=>
//   {
//     localStorage.setItem('access_token',res.token);
//     this.currentUser=res;
//     this.router.navigate(['user-profike/'+res.msg._id])
//   });
  
// }
// }
// getToken(){
//     return localStorage.getItem('access_token');
// }
// get isLoggedIn():boolean{
//   let authToken=localStorage.getItem('access_token');
//   return authToken!==null?true:false;
// }
// doLogout() {
//   let removeToken = localStorage.removeItem('access_token');
//   if (removeToken == null) {
//     this.router.navigate(['log-in']);
//   }
// }
// // User profile
// getUserProfile(id: any): Observable<any> {
//   let api = `${this.endpoint}/user-profile/${id}`;
//   return this.http.get(api, { headers: this.headers }).pipe(
//     map((res) => {
//       return res || {};
//     }),
//     catchError(this.handleError)
//   );
// }
// // Error
// handleError(error: HttpErrorResponse) {
//   let msg = '';
//   if (error.error instanceof ErrorEvent) {
//     // client-side error
//     msg = error.error.message;
//   } else {
//     // server-side error
//     msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
//   }
//   return throwError(msg);
// }
// }

// function getToken() {
//   throw new Error('Function not implemented.');
// }
  