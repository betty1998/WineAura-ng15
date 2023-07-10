import { NgModule } from '@angular/core';
import {AsyncPipe, CommonModule, CurrencyPipe, DatePipe, NgForOf, NgStyle} from '@angular/common';
import {
  NbCardModule, NbIconComponent,
  NbIconLibraries,
  NbIconModule, NbIconPackType,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule
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
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
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

const routes:Routes =[
  {
    path:"",
    component:AdminComponent,
    children:[
      {
        path:"dashboard",
        component:DashboardComponent
      },
      {
        path:"product-list",
        component:AdminProductComponent
      },
      {
        path:"product-list/add-product",
        component:AdminProductDetailComponent
      },
      {
        path:"product-list/edit-product/:id",
        component:AdminProductDetailComponent
      },
      {
        path:"order",
        component:AdminOrderComponent
      },
      {
        path:"order/edit-order/:id",
        component:AdminOrderDetailComponent
      },
      {
        path:"order/view-order/:id",
        component:AdminOrderDetailComponent
      },
      {
        path:"customer",
        component:CustomerComponent
      },
      {
        path:"customer/edit-customer/:id",
        component:CustomerDetailComponent
      },
      {
        path:"category",
        component:CategoryComponent
      },
      {
        path:"administrator",
        component:AdministratorComponent
      },
      {
        path:"administrator/edit-admin/:id",
        component:CustomerDetailComponent
      },
      {
        path:"profile",
        component:AdminProfileComponent
      },
      {
        path:"**",
        redirectTo:"dashboard"
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
    RoleDirective

  ],
  imports: [
    NbThemeModule.forRoot(),
    NbCardModule,
    RouterModule.forChild(routes),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbIconModule,
    NgChartsModule,
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
    AccountModule

  ],
  providers:[
    {provide:NgChartsConfiguration, useValue:{generateColors:false}},
    DatePipe
  ]
})
export class AdminModule { }
