import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NbThemeModule} from "@nebular/theme";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AdminLoginComponent} from "./admin/admin-auth/admin-login/admin-login.component";
import {AdminRegisterComponent} from "./admin/admin-auth/admin-register/admin-register.component";

const routes: Routes = [
  {
    path:"",
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path:"admin",
    loadChildren: ()=>import("./admin/admin.module").then(m=>m.AdminModule)
  },
  {
    path: "**",
    redirectTo: "",
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
