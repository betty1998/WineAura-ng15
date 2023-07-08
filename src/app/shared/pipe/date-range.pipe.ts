import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "../model/Order";
import {MatTableDataSource} from "@angular/material/table";

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {

  transform(datasource: MatTableDataSource<Order>, dates:Date[]): MatTableDataSource<Order> {
    const orders = datasource?.data;
    if (orders && dates.length>1) {
      const  newOrders = orders.filter(order=>{
        return new Date(order.purchaseDate||"0") >= dates[0] && new Date(order.purchaseDate||"0") <= dates[1];
      });
      return new MatTableDataSource<Order>(newOrders);
    }
    return datasource;
  }

}
