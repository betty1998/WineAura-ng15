import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {ProductComponent} from "./product/product.component";
import {ProductDetailComponent} from "./product/product-detail/product-detail.component";
import {CartComponent} from "./checkout/cart/cart.component";
import {OrderDetailComponent} from "./checkout/cart/order-detail/order-detail.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {CheckoutSuccessComponent} from "./checkout-success/checkout-success.component";
import {AccountComponent} from "./account/account.component";

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
    path:"checkout/:id",
    // component: CartComponent,
    // children:[
    //   {
    //     path:"order-detail",
    //     component: OrderDetailComponent}
    // ]
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
    // canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path:"checkout-success/:orderId",
    component:CheckoutSuccessComponent
  },
  {
    path:"account/:id",
    component: AccountComponent,
    // canActivate:[AuthGuard]
  },


  {
    path: "**",
    redirectTo: "products",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
