// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
import { fi } from 'date-fns/locale';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private http:HttpClient) { 
   
  }
  Fileupload(fname:string){
      
  }
}
/*import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RecepService } from '../../services/recep.service';
import { Receptionist } from '../../../models/receptionist';
import { User } from '../../../models/user'
import { Clinic } from '../../../models/clinic';
// import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { FormGroup, FormControl, FormBuilder}  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ClinicAddComponent } from '../../clinic/clinic-add/clinic-add.component';
import { HttpClient } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receptionist-add',
  templateUrl: './receptionist-add.component.html',
  styleUrls: ['./receptionist-add.component.css'],
  providers: []
})
export class ReceptionistAddComponent implements OnInit {
  public files: any[] = [];

  @ViewChild('recepimg',{static:false}) recepImg:any;
  // newRecep:Receptionist |any;
  newRecep = new Receptionist("","","","","","",0,"","","","",3000,new Clinic("","","","","",[]),new User("","","","","","",0,"","",""));
  // preview: string|any;
  //
  // percentDone: any = 0;
  users = [];
  public recepAdded: Receptionist|any;

  constructor(private recepSer:RecepService) {

  }
  ngOnInit(): void {}


  onFileChange(event:any){
    this.files = event.target.files;
    console.log(event.target.files[0]);
  }


  onSubmit(){
    var formData: any = new FormData();
    let imgBlob=(this.recepImg as ElementRef).nativeElement.files[0];
    console.log(imgBlob)
    formData.set('image',imgBlob);
    formData.append('fname', this.newRecep.fname);
    formData.append('lname', this.newRecep.lname);
    formData.append('email', this.newRecep.email);
    formData.append('password', this.newRecep.password);
    // formData.append('image', this.newRecep.image);
    formData.append('age', this.newRecep.age);
    formData.append('phoneNumber', this.newRecep.phoneNumber);
    formData.append('gender', this.newRecep.gender);
    formData.append('userType',this.newRecep.userType);
    formData.append('salary',this.newRecep.salary);
    formData.append('clinic',this.newRecep.clinicId);
    this.recepSer.addReceptionist(
      formData
    ).subscribe({
      next:(res=>console.log(res))
    })
  }

*/ 
