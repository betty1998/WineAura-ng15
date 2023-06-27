import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomStyleModule} from "./shared/modules/custom-style/custom-style.module";
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/interceptor/auth.interceptor";
import { ProductComponent } from './product/product.component';
import { ProductOverviewComponent } from './product/product-overview/product-overview.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import {ErrorInterceptor} from "./shared/interceptor/error.interceptor";
import {MatGridListModule} from "@angular/material/grid-list";
import {CheckoutModule} from "./checkout/checkout.module";
import {CheckoutSuccessComponent} from "./checkout-success/checkout-success.component";
import {AccountModule} from "./account/account.module";
import {OrderSortPipe} from "./shared/pipe/order-sort.pipe";
import {OrderFilterPipe} from "./shared/pipe/order-filter.pipe";
import { SearchPipe } from './shared/pipe/search.pipe';
import { PriceRangePipe } from './shared/pipe/price-range.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductComponent,
    ProductOverviewComponent,
    ProductDetailComponent,
    CheckoutSuccessComponent,
    OrderSortPipe,
    OrderFilterPipe,
    SearchPipe,
    PriceRangePipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomStyleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    CheckoutModule,
    // AccountModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    SearchPipe
  ],
  exports: [
    OrderFilterPipe,
    OrderSortPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
