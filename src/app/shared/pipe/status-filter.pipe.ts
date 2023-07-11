import { Pipe, PipeTransform } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../model/Order";
import {Product} from "../model/Product";
import {combineLatestAll} from "rxjs";

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {

  transform(datasource: MatTableDataSource<any>, status:string): MatTableDataSource<any> {
    const obj = datasource?.data;
    if (status) {
      const  newOrders =obj.filter(item=>item.status === status || item.productStatus === status);
      return new MatTableDataSource(newOrders);
    }
    return datasource;
  }

}
