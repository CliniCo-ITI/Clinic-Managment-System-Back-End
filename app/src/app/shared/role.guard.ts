import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class roleguard implements CanActivate {
  currentrole: any;
  respdata: any;
  constructor(private service: LoginService, private route: Router) {

  }canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.islogin()) {
      this.currentrole = this.service.getRoleToken(this.service.getToken());
      this.service.haveaccess(this.currentrole, route.url[0].path).subscribe(result => {
        this.respdata = result;
        if (this.respdata.result == 'pass') {
          return true;
        } else {
          this.route.navigate(['']);//account page
          alert('unauthorized access');
          return false;
        }
      });

      return true;
    } else {
      this.route.navigate(['home']);
      return false;
    }
  }
}
