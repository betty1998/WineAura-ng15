import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {ProductComponent} from "./product/product.component";
import {ProductDetailComponent} from "./product/product-detail/product-detail.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {CheckoutSuccessComponent} from "./checkout-success/checkout-success.component";
import {ProfileComponent} from "./account/profile/profile.component";
import {AddressBookComponent} from "./account/address-book/address-book.component";
import {OrderHistoryComponent} from "./account/order-history/order-history.component";
import {FavoriteComponent} from "./account/favorite/favorite.component";
import {ReviewComponent} from "./after-sale/review/review.component";
import {AccountComponent} from "./account/account.component";
import {ReturnComponent} from "./after-sale/return/return.component";

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
    // canActivate:[AuthGuard],
    children:[
      {
        path:"profile",
        component:ProfileComponent
      },
      {
        path:"address-book",
        component:AddressBookComponent
      },
      {
        path:"order-history",
        component: OrderHistoryComponent
      },
      {
        path:"favorite",
        component: FavoriteComponent
      }
    ]
  },
  {
    path:"review/:productId/purchase/:purchaseId",
    component: ReviewComponent
  },
  {
    path:"return/:orderId",
    component:ReturnComponent
  },
  {
    path:"admin",
    loadChildren: ()=>import("./admin/admin.module").then(m=>m.AdminModule)
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
