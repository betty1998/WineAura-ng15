import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {NgChartsConfiguration, NgChartsModule} from "ng2-charts";

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
    CategoryChartComponent

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
    NgChartsModule

  ],
  providers:[
    {provide:NgChartsConfiguration, useValue:{generateColors:false}}
  ]
})
export class AdminModule { }
