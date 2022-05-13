import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-all-user-management',
  templateUrl: './all-user-management.component.html',
  styleUrls: ['./all-user-management.component.scss']
})
export class AllUserManagementComponent implements OnInit {

  public userList: User[] = [];

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    this.userService.getAllUser().subscribe((data:User[])=>{
      this.userList = data;
    },err =>{
      console.log(err);
    })
  }


}
