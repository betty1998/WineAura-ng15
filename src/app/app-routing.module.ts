import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {ProductComponent} from "./product/product.component";
import {ProductDetailComponent} from "./product/product-detail/product-detail.component";
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "products",
    component: ProductComponent
  },
  {
    path:"product-detail/:id",
    component:ProductDetailComponent
  },
  {
    path:"cart/:id",
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
