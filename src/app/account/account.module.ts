import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ProfileComponent} from "./profile/profile.component";
import {RouterModule, Routes} from "@angular/router";
import {FavoriteComponent} from "./favorite/favorite.component";
import {CheckoutSuccessComponent} from "../checkout-success/checkout-success.component";
import {AddressBookComponent} from "./address-book/address-book.component";
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {CustomStyleModule} from "../shared/modules/custom-style/custom-style.module";
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import { AccountHomeComponent } from './account-home/account-home.component';
import { OrderDialogComponent } from './order-history/order-dialog/order-dialog.component';
import {AppModule} from "../app.module";

const routes:Routes=[
  // {
  //   path:"",
  //   component:AccountHomeComponent,
  //   children:[
  //     {
  //       path:"profile",
  //       component:ProfileComponent
  //     },
  //     {
  //       path:"address-book",
  //       component:AddressBookComponent
  //     },
  //     {
  //       path:"order-history",
  //       component: OrderHistoryComponent
  //     },
  //     {
  //       path:"favorite",
  //       component: FavoriteComponent
  //     }
  //   ]
  // },

]

@NgModule({
  declarations: [
    FavoriteComponent,
    ProfileComponent,
    AddressBookComponent,
    OrderHistoryComponent,
    AccountHomeComponent,
    OrderDialogComponent,
  ],
  imports: [
    CommonModule,
    CustomStyleModule,
    MatDividerModule,
    MatListModule,
    RouterModule.forChild(routes),
    AppModule
  ]
})
export class AccountModule { }
