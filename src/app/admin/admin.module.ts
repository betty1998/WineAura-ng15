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
import { TotalOrdersComponent } from './dashboard/total-orders/total-orders.component';
import { TotalSalesComponent } from './dashboard/total-sales/total-sales.component';
import { TotalUsersComponent } from './dashboard/total-users/total-users.component';
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
import {AppModule} from "../app.module";
import {StatusDirective} from "../shared/directive/status.directive";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AdminTabTitleDirective} from "../shared/directive/admin-tab-title.directive";
import { AdminProductDetailComponent } from './admin-product/admin-product-detail/admin-product-detail.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

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
        path:"product",
        component:AdminProductComponent
      },
      {
        path:"product/add-product",
        component:AdminProductDetailComponent
      },
      {
        path:"product/edit-product/:id",
        component:AdminProductDetailComponent
      },
      {
        path:"order",
        component:AdminOrderComponent
      },
      {
        path:"customer",
        component:CustomerComponent
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
    TotalOrdersComponent,
    TotalSalesComponent,
    TotalUsersComponent,
    SalesChartComponent,
    TodayComponent,
    RecentOrderComponent,
    CategoryChartComponent,
    SalesChartHeaderComponent,
    TopSellingComponent,
    StatusDirective,
    AdminTabTitleDirective,
    AdminProductDetailComponent

  ],
  imports: [
    NbThemeModule.forRoot(),
    NbCardModule,
    RouterModule.forChild(routes),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    NbIconModule,
    MatIconModule,
    MatGridListModule,
    NgChartsModule,
    AsyncPipe,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    FlexModule,
    MatTableModule,
    DatePipe,
    CurrencyPipe,
    MatSortModule,
    MatPaginatorModule,
    NgForOf,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule


  ],
  providers:[
    {provide:NgChartsConfiguration, useValue:{generateColors:false}}
  ]
})
export class AdminModule { }
