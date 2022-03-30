import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
//import { Router } from 'express';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {  LoginService } from '../../shared/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(private service:LoginService,private route:Router){}
 canActivate(){
   if(this.service.islogin()){
     return true;
   }else{
     this.route.navigate(['home']);
     return false;
   }
  
 }
   
 }
  

