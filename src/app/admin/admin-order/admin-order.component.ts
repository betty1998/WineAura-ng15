import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Order} from "../../shared/model/Order";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrderService} from "../../shared/service/order.service";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(private orderService:OrderService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(res=>{
      if (res.success) {
        this.orders = res.data;
        console.log(this.orders)
        this.dataSource = new MatTableDataSource<Order>(this.orders);
        this.customizeSort();
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

  }
}
