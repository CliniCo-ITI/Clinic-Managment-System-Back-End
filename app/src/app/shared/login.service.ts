import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { json } from 'body-parser';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
apiurl='https://localhost:4800/login'
  //http: any;
  tokenresponse:any;
  constructor(private http:HttpClient, private router: Router) {

   }
   GenerateRefreshToken() {
    let input = {
      "jwtToken": this.getToken(),
      "refreshToken": this.GetRefreshToken()
    }
    return this.http.post(this.apiurl + 'refresh', input);
  }
  GetRefreshToken() {
    throw new Error('Method not implemented.');
  }
  userLogin(userdata:any){
    return this.http.post(this.apiurl+'authenticate'+userdata,json)//m3rfsh json eh aslan
  }
  islogin()//if exist
  {
    return localStorage.getItem("token")!=null;
  }
  getToken(){
    return localStorage.getItem("token") ||'';
  }
savetokens(tokendata:any){
  localStorage.setItem('token', tokendata.jwtToken);
 
}
logout(){ 
  alert('your session expired');
  localStorage.clear();
  this.router.navigateByUrl('home')
}
getRoleToken(token:any){
  let _token=token.split('.')[1];
  this.tokenresponse=JSON.parse(atob(_token))//decode what have encoded wz base64
  return this.tokenresponse
}
haveaccess(role:any,menu:any){
  return this.http.get(this.apiurl + 'HaveAccess?role=' + role + '&menu=' + menu);
}


}

