import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";
import {ProductComponent} from "./product/product.component";
import {ProductOverviewComponent} from "./product/product-overview/product-overview.component";
import {ProductDetailComponent} from "./product/product-detail/product-detail.component";
import {CheckoutSuccessComponent} from "./checkout-success/checkout-success.component";

import {SearchPipe} from "../shared/pipe/search.pipe";
import {PriceRangePipe} from "../shared/pipe/price-range.pipe";
import {FilterPipe} from "../shared/pipe/filter.pipe";
import {ReviewComponent} from "./after-sale/review/review.component";
import {ReturnComponent} from "./after-sale/return/return.component";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomStyleModule} from "../shared/modules/custom-style/custom-style.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatGridListModule} from "@angular/material/grid-list";
import {CheckoutModule} from "./checkout/checkout.module";
import {NgxPaginationModule} from "ngx-pagination";
import {AccountModule} from "./account/account.module";
import {OrderFilterPipe} from "../shared/pipe/order-filter.pipe";
import {OrderSortPipe} from "../shared/pipe/order-sort.pipe";
import {AuthInterceptor} from "../shared/interceptor/auth.interceptor";
import {ErrorInterceptor} from "../shared/interceptor/error.interceptor";
import {AuthService} from "../shared/service/auth.service";
import {NbLayoutModule} from "@nebular/theme";


@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    HomeComponent,
    ProductComponent,
    ProductOverviewComponent,
    ProductDetailComponent,
    CheckoutSuccessComponent,
    ReviewComponent,
    ReturnComponent,
    SearchPipe,
    PriceRangePipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CustomStyleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    CheckoutModule,
    NgxPaginationModule,
    AccountModule,
    NbLayoutModule
  ],
  providers:[
    SearchPipe,
  ]

})
export class UserModule { }
