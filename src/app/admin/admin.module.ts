import { NgModule } from '@angular/core';
import {AsyncPipe, CommonModule, CurrencyPipe, DatePipe, NgForOf, NgStyle} from '@angular/common';
import {
  NbMenuModule,
  NbSidebarModule
} from "@nebular/theme";
import { AdminComponent } from './admin.component';
import {RouterModule, Routes} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { CustomerComponent } from './customer/customer.component';
import { CategoryComponent } from './category/category.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { TotalSalesComponent } from './dashboard/total-static/total-sales/total-sales.component';
import { SalesChartComponent } from './dashboard/sales-chart/sales-chart.component';
import { TodayComponent } from './dashboard/today/today.component';
import { RecentOrderComponent } from './dashboard/recent-order/recent-order.component';
import { CategoryChartComponent } from './dashboard/category-chart/category-chart.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {BaseChartDirective, NgChartsConfiguration, NgChartsModule} from "ng2-charts";
import {SalesChartHeaderComponent} from "./dashboard/sales-chart/sales-chart-header/sales-chart-header";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {TopSellingComponent } from './dashboard/top-selling/top-selling.component';
import {MatTableModule} from "@angular/material/table";
import {StatusDirective} from "../shared/directive/status.directive";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AdminTabTitleDirective} from "../shared/directive/admin-tab-title.directive";
import { AdminProductDetailComponent } from './admin-product/admin-product-detail/admin-product-detail.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { TotalStaticComponent } from './dashboard/total-static/total-static.component';
import { DateRangeFilterComponent } from './admin-order/date-range-filter/date-range-filter.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateRangePipe} from "../shared/pipe/date-range.pipe";
import { StatusFilterComponent } from './admin-order/status-filter/status-filter.component';
import { AdminOrderDetailComponent } from './admin-order/admin-order-detail/admin-order-detail.component';
import {CustomStyleModule} from "../shared/modules/custom-style/custom-style.module";
import {AppModule} from "../app.module";
import {StatusFilterPipe} from "../shared/pipe/status-filter.pipe";
import {MatMenuModule} from "@angular/material/menu";
import { TrackingNumberDialogComponent } from './admin-order/tracking-number-dialog/tracking-number-dialog.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {RoleDirective} from "../shared/directive/role.directive";
import {AccountModule} from "../user/account/account.module";
import { AddAdminDialogComponent } from './administrator/add-admin-dialog/add-admin-dialog.component';
import {LoginComponent} from "../auth/login/login.component";
import {RegisterComponent} from "../auth/register/register.component";
import {AdminRegisterComponent} from "./admin-auth/admin-register/admin-register.component";
import {AdminLoginComponent} from "./admin-auth/admin-login/admin-login.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AdminInterceptor} from "../shared/interceptor/admin.interceptor";
import {ErrorInterceptor} from "../shared/interceptor/error.interceptor";
import {AdminErrorInterceptor} from "../shared/interceptor/admin-error.interceptor";
import {AdminAuthGuard} from "../shared/guard/adminAuth.guard";
import {SharedModule} from "../shared/modules/shared-module/shared.module";


const routes:Routes =[
  {
    path:"",
    component:AdminComponent,
    children:[
      {
        path: "login",
        component: AdminLoginComponent
      },
      {
        path: "register",
        component: AdminRegisterComponent
      },
      {
        path:"dashboard",
        component:DashboardComponent,
        canActivate:[AdminAuthGuard]
      },
      {
        path:"product-list",
        component:AdminProductComponent,
        canActivate:[AdminAuthGuard]
      },
      {
        path:"product-list/add-product",
        component:AdminProductDetailComponent,
        canActivate:[AdminAuthGuard]
      },
      {
        path:"product-list/edit-product/:id",
        component:AdminProductDetailComponent,
        canActivate:[AdminAuthGuard]
      },
      {
        path:"order",
        component:AdminOrderComponent,
        canActivate:[AdminAuthGuard]
      },
      {
        path:"order/edit-order/:id",
        component:AdminOrderDetailComponent,
        canActivate:[AdminAuthGuard]
      },
      {
        path:"order/view-order/:id",
        component:AdminOrderDetailComponent,
        canActivate:[AdminAuthGuard]
      },
      {
        path:"customer",
        component:CustomerComponent,
        canActivate:[AdminAuthGuard]
      },
      {
        path:"customer/edit-customer/:id",
        component:CustomerDetailComponent,
        canActivate:[AdminAuthGuard]
      },
      {
        path:"category",
        component:CategoryComponent,
        canActivate:[AdminAuthGuard]
      },
      {
        path:"administrator",
        component:AdministratorComponent,
        canActivate:[AdminAuthGuard]
      },
      {
        path:"administrator/edit-admin/:id",
        component:CustomerDetailComponent,
        canActivate:[AdminAuthGuard]
      },
      {
        path:"profile",
        component:AdminProfileComponent,
        canActivate:[AdminAuthGuard]
      },
      {
        path:"",
        redirectTo:"/admin/dashboard",
        pathMatch:"full"
      }
    ]
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AdminProductComponent,
    AdminOrderComponent,
    AdminProfileComponent,
    CustomerComponent,
    CategoryComponent,
    AdministratorComponent,
    TotalSalesComponent,
    SalesChartComponent,
    TodayComponent,
    RecentOrderComponent,
    CategoryChartComponent,
    SalesChartHeaderComponent,
    TopSellingComponent,
    StatusDirective,
    AdminTabTitleDirective,
    AdminProductDetailComponent,
    TotalStaticComponent,
    DateRangeFilterComponent,
    DateRangePipe,
    StatusFilterComponent,
    AdminOrderDetailComponent,
    StatusFilterPipe,
    TrackingNumberDialogComponent,
    CustomerDetailComponent,
    RoleDirective,
    AddAdminDialogComponent,

  ],
    imports: [
        RouterModule.forChild(routes),
        NgChartsModule,
        NbSidebarModule.forRoot(),
        AsyncPipe,
        FormsModule,
        FlexModule,
        DatePipe,
        CurrencyPipe,
        MatGridListModule,
        CustomStyleModule,
        MatSortModule,
        MatPaginatorModule,
        NgForOf,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        CommonModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatMenuModule,
        MatTooltipModule,
        AccountModule,
        SharedModule



    ],
  exports: [
    AdminTabTitleDirective
  ],
  providers: [
    {provide: NgChartsConfiguration, useValue: {generateColors: false}},

    DatePipe
  ]
})
export class AdminModule { }
