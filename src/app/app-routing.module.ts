import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUserManagementComponent } from './all-user-management/all-user-management.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "user-management", component: UserManagementComponent,canActivate:[AuthGuard]},
  { path: "all-user-management", component: AllUserManagementComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
