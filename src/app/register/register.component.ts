import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../Models/role';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public roles: Role[] = [];
  public registerForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userServie: UserService
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
  }

  onSubmit() {
    console.log('submit');

    let fullName = this.registerForm.controls['fullName'].value;
    let email = this.registerForm.controls['email'].value;
    let password = this.registerForm.controls['password'].value;

    this.userServie.register(fullName, email, password,this.roles.filter(x=>x.isSelected)[0].role).subscribe(
      (res) => {

        this.registerForm.controls["fullName"].setValue("");
        this.registerForm.controls["email"].setValue("");
        this.registerForm.controls["password"].setValue("");
        this.roles.forEach(x=>x.isSelected=false);
        this.router.navigate(["login"]);


        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllRoles() {
    this.userServie.getRoles().subscribe(roles=> {
      this.roles = roles;
    });
  }

  onRoleChange(role: string) {
    this.roles.forEach((x) => {
      if (x.role == role) {
        x.isSelected = true;
      }else{
        x.isSelected = false;
      }
    });
  }

  get isRoleSelected() {
    return this.roles.filter((x) => x.isSelected).length > 0;
  }
}
