import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Order} from "../../shared/model/Order";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrderService} from "../../shared/service/order.service";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {OrderStatus} from "../../shared/model/OrderStatus";
import {ConfirmDialogComponent} from "../../shared/dialog/confirm-dialog.component";
import {Product} from "../../shared/model/Product";
import {TrackingNumberDialogComponent} from "./tracking-number-dialog/tracking-number-dialog.component";


@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit, AfterViewInit {
  searchText: any;
  displayedColumns: string[] = ["id","customer","purchaseDate","item","amount","status","action"];
  orders: Order[] = [];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dateRange: Date[]=[];
  orderStatus: string[]=[];
  statusToFilter!: string;

  constructor(private orderService:OrderService,
              public dialog: MatDialog,
              private date:DatePipe) {
  }

  ngOnInit(): void {
    this.orderStatus = Object.values(OrderStatus);
    this.orderService.getOrders("admin").subscribe(res=>{
      if (res.success) {
        this.orders = res.data;
        console.log(this.orders)
        this.dataSource = new MatTableDataSource<Order>(this.orders);
        this.customizeSort();
        this.customizeFilter();
        this.setDataSourceAttributes();
      } else {
        console.log(res);
        alert(res.message);
      }
    });
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.setDataSourceAttributes();
    }

  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  customizeSort() {
    this.dataSource.sortingDataAccessor = (order, property) => {
      if (property === 'customer') {
        return order.firstName+order.lastName;
      } else if (property === 'item') {
        return order.itemAmount;
      }else if (property === 'amount') {
        return order.subTotal;
      } else {
        return order[property];
      }
    };
  }

  deleteOrder(id:number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this order?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.deleteOrder(id,"admin").subscribe(res=>{
          if (res.success) {
            this.orders = this.orders.filter(order => order.id !== id);
            this.dataSource = new MatTableDataSource<Order>(this.orders);
            this.setDataSourceAttributes();
          } else {
            console.log(res);
            alert(res.message);
          }
        });
      }
    });
  }

  customizeFilter() {
    // Save a reference to the default filter predicate
    const defaultFilter = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (order: Order, filter: string) => {
      const defaultResult = defaultFilter(order, filter);
      const id = ("O"+(1000+(order.id||0))).toLowerCase();
      const name = (order.firstName + order.lastName).toLowerCase();
      const idResult = id.includes(filter.trim().toLowerCase());
      const nameResult = name.includes(filter.trim().toLowerCase());
      const dateResult = this.date.transform(order.purchaseDate,"short")?.includes(filter.trim().toLowerCase());
      return dateResult || idResult || nameResult || defaultResult;
    };
  }

  dateRangeFilter(event: Date[]) {
    this.dateRange = event;
  }

  statusFilter(status: string) {
    this.statusToFilter = status;
    // if (status) {
    //   this.dataSource.filter = status.trim().toLowerCase();
    // } else {
    //   this.dataSource.filter = "";
    // }
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  ship(order: Order) {
    // open dialog to add tracking number
    const dialogRef = this.dialog.open(TrackingNumberDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        order.trackingNumber = result;
        order.status = OrderStatus.SHIPPED;
        this.orderService.updateStatus(order.id, order,"admin").subscribe(res => {
          if (res.success) {
            this.setDataSourceAttributes();
          } else {
            console.log(res);
            alert(res.message);
          }
        });
      }
    });
  }

  updateStatus(order: Order, status: string) {
    // convert string to OrderStatus
    order.status = status as OrderStatus;
    console.log(order);
    this.orderService.updateStatus(order.id, order,"admin").subscribe(res => {
      if (res.success) {
        this.setDataSourceAttributes();
      } else {
        console.log(res);
        alert(res.message);
      }
    });
  }

}
