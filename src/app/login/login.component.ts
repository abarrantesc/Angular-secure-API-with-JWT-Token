import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from '../Helpers/constants';
import { ResponseModel } from '../Models/responseModel';
import { User } from '../Models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder,private userServie: UserService,private router:Router) { }

  ngOnInit(): void {
  }


  onSubmit() {
    console.log("submit");

    let email = this.loginForm.controls["email"].value;
    let password = this.loginForm.controls["password"].value;

    this.userServie.login(email,password).subscribe((res:ResponseModel) =>{

      if(res.responseCode ==1){
        localStorage.setItem(Constant.USER_KEY,JSON.stringify(res.dataSet));
        let user = res.dataSet as User;

        if(user.role=='Admin'){
          this.router.navigate(["/all-user-management"]);
        }else{
          this.router.navigate(["/user-management"]);
        }

      }

      console.log(res)
    },error=>{
      console.log(error);
    })

  }

}
