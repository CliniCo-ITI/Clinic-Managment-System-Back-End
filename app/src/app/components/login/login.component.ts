import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
//import { Router } from 'express';
import { Result } from 'express-validator';
import { LoginService } from 'src/app/shared/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
responseDate:any;
  constructor(private service:LoginService,private route:Router) { 
    localStorage.clear();
  }
 
  ngOnInit(): void {
  }
  loginform=new FormGroup({
    username:new FormControl(''),
    password:new FormControl('')
  })
  userLogin(){
  if(this.loginform.valid)
  {
    this.service.userLogin(this.loginform.value).subscribe(result=>{
      this.responseDate=result;
      if(this.responseDate!=null){
        localStorage.setItem('token',this.responseDate.jwtToken);
        localStorage.setItem('refreshtoken',this.responseDate.refreshtoken)
        //if success redirect to home page
        this.route.navigate(['']);//navigate to his account
         alert("redirect to your account")
      }else{
        alert('login failed');
      }
    }

    )};
  }
}
