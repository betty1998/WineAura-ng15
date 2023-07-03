import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NbThemeModule} from "@nebular/theme";

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
