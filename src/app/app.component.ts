import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from './Helpers/constants';
import { User } from './Models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webAuth';

  constructor(private router:Router){

  }


  onLogout(){
         localStorage.removeItem(Constant.USER_KEY);
  }

  get isUserLogin(){
    const user = localStorage.getItem(Constant.USER_KEY);
    return user && user.length>0;

  }


  get user():User{
    return JSON.parse(localStorage.getItem(Constant.USER_KEY)) as User;
  }

get isAdmin():Boolean{
  return this.user.role=='Admin'
}
get isUser():Boolean{
  return this.user.role=='User'
}

}
