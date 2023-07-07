import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomStyleModule} from "./shared/modules/custom-style/custom-style.module";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/interceptor/auth.interceptor";
import {ErrorInterceptor} from "./shared/interceptor/error.interceptor";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgxPaginationModule} from "ngx-pagination";
import {MatCardModule} from "@angular/material/card";
import { TotalSalesComponent } from './dashboard/total-sales/total-sales.component';
import { NgChartsModule } from 'ng2-charts';
import { ConfirmDialogComponent } from './shared/dialog/confirm-dialog.component';
import {InfoDialogComponent} from "./shared/dialog/info-dialog.component";
import {AddOptionDialogComponent} from "./shared/dialog/add-option-dialog.component";


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        TotalSalesComponent,
        ConfirmDialogComponent,
        InfoDialogComponent,
        AddOptionDialogComponent
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
        MatCardModule,
        NgxPaginationModule,
        NgChartsModule

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
        }
    ],
  exports: [
    TotalSalesComponent
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
