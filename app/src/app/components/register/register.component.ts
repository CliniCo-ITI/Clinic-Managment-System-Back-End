import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms'
import { FileuploadService } from 'src/app/shared/fileupload.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //progress:number=0//initial value
 
 
  constructor(public service:FileuploadService) { }
   
  progress:number=0;
  
  ngOnInit(): void {
  }
  myform=new FormGroup({
    fname:new FormControl(''),
    lname:new FormControl(''),
    email:new FormControl(''),
     password:new FormControl(''),
    image:new FormControl(''),//fileupload
  age:new FormControl(''),
  phone:new FormControl(''),
   gender:new FormControl(''),
   userType:new FormControl('')//usertype
   });
   uploadFile(event:any)
  {
  const file=event.target.files ? event.target.files[0] :'';
  }    
  submitImage(){
    //this.Fileupload
  }
}