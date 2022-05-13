import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from './Models/responseModel';
import {map} from 'rxjs/operators';
import { ResponseCode } from './enums/ReponseCode';
import { User } from './Models/user';
import { Constant } from './Helpers/constants';
import { Role } from './Models/role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'https://localhost:44351';

  constructor(private httpClient: HttpClient) {}

  public login(email: string, password: string) {
    const body = {
      Email: email,
      Password: password,
    };
    return this.httpClient.post<ResponseModel>(
      this.baseUrl + '/api/user/Login',
      body
    );
  }

  public register(
    fullname: string,
    email: string,
    password: string,
    role: string
  ) {
    const body = {
      FullName: fullname,
      Email: email,
      Password: password,
      Role: role,
    };

    console.log(body);

    return this.httpClient.post<ResponseModel>(
      this.baseUrl + '/api/User/RegisterUser',
      body
    );
  }

  public getAllUser() {
    let userInfo = JSON.parse(localStorage.getItem(Constant.USER_KEY));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });

    return this.httpClient
      .get<ResponseModel>(this.baseUrl + '/api/User/GetAllUser', {
        headers: headers,
      })
      .pipe(
        map((res) => {
          let userList = new Array<User>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dataSet) {
              res.dataSet.map((x: User) => {
                userList.push(
                  new User(x.fullName, x.email, x.userName, x.role)
                );
              });
            }
          }
          return userList;
        })
      );
  }

  public GetUserList()
  {
    let userInfo=JSON.parse(localStorage.getItem(Constant.USER_KEY));
   const headers=new HttpHeaders({
'Authorization':`Bearer ${userInfo?.token }`
   });

   return this.httpClient.get<ResponseModel>(this.baseUrl + "/api/User/GetUserList",{headers:headers}).pipe(map(res=>{
     let userList=new Array<User>();
     if(res.responseCode==ResponseCode.OK)
     {
          if(res.dataSet)
          {
          res.dataSet.map((x:User)=>{
              userList.push(new User(x.fullName,x.email,x.userName,x.role));
          })
          }
         }
         return userList;
   }));
  }

  public getRoles() {
    let userInfo = JSON.parse(localStorage.getItem(Constant.USER_KEY));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });

    return this.httpClient
      .get<ResponseModel>(this.baseUrl + '/api/User/GetRoles', {
        headers: headers,
      })
      .pipe(
        map((res) => {
          let roleList = new Array<Role>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dataSet) {
              res.dataSet.map((x: string) => {
                roleList.push(new Role(x));
              });
            }
          }
          return roleList;
        })
      );
  }
}
