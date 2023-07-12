import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../shared/model/User";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../shared/service/user.service";
import {MatDialog} from "@angular/material/dialog";
import {UserInfoService} from "../../shared/service/user-info.service";
import {UserInfo} from "../../shared/model/UserInfo";
import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements AfterViewInit, OnInit{
  searchText: any;
  displayedColumns: string[] = ["id","username", "name","email","phone","status","action"];
  customerInfos:UserInfo[] = [];
  dataSource!: MatTableDataSource<UserInfo>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private infoService:UserInfoService,
              private auth:AuthService,
              private userService:UserService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.infoService.getCustomers().subscribe(res=>{
      if (res.success) {
        this.customerInfos = res.data;
        console.log(this.customerInfos);
        this.dataSource = new MatTableDataSource<UserInfo>(this.customerInfos);
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
    this.dataSource.sortingDataAccessor = (customer, property) => {
      if (property === 'customer') {

      } else if (property === 'item') {

      }else if (property === 'amount') {

      } else {
        return customer[property];
      }
    };
  }

  deleteCustomer(userId:number) {
    this.userService.deleteUser(userId).subscribe(res=>{
      if (res.success) {
        this.customerInfos = this.customerInfos.filter(item=>item.user.id!=userId);
        this.dataSource.data = this.customerInfos;
        this.setDataSourceAttributes();
      } else {
        alert(res.message);
      }
    });
  }

  updateStatus(status:string, id:number) {
    this.customerInfos.forEach(item=>{
      if (item.user.id==id) {
        item.user.status = status;
      }
    })
    this.userService.updateUser(id,status).subscribe(res=>{
      if (res.success) {
        this.setDataSourceAttributes();
      } else {
        alert(res.message);
      }
    } );
  }
}
