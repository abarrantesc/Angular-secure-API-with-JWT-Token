import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public userList: User[] = [];

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    this.userService.GetUserList().subscribe((data:User[])=>{
      this.userList = data;
    },err =>{
      console.log(err);
    })
  }

}
