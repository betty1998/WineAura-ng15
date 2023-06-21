import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './cart/order-detail/order-detail.component';
import {RouterModule, Routes} from "@angular/router";
import {CartComponent} from "./cart/cart.component";
import {OrderSummaryComponent} from "./cart/order-summary/order-summary.component";
import {MatDividerModule} from "@angular/material/divider";
import {CustomStyleModule} from "../shared/modules/custom-style/custom-style.module";
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    OrderDetailComponent,
    OrderSummaryComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomStyleModule
  ]
})
export class CheckoutModule { }
