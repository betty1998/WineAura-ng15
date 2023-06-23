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
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ErrorInterceptor} from "./shared/interceptor/error.interceptor";
import {MatGridListModule} from "@angular/material/grid-list";
import { CartComponent } from './checkout/cart/cart.component';
import { AccountComponent } from './account/account.component';
import { FavoriteComponent } from './account/favorite/favorite.component';
import { ProfileComponent } from './account/profile/profile.component';
import { OrderSummaryComponent } from './checkout/cart/order-summary/order-summary.component';
import {CheckoutModule} from "./checkout/checkout.module";
import {CheckoutSuccessComponent} from "./checkout-success/checkout-success.component";

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
    AccountComponent,
    FavoriteComponent,
    ProfileComponent,
    CheckoutSuccessComponent,

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


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
