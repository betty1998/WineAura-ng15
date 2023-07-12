import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../shared/model/User";
import {StoreManager} from "../../shared/model/StoreManager";
import {UserInfoService} from "../../shared/service/user-info.service";
import {AuthService} from "../../shared/service/auth.service";
import {UserInfo} from "../../shared/model/UserInfo";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {AddAdminDialogComponent} from "./add-admin-dialog/add-admin-dialog.component";
import {UserService} from "../../shared/service/user.service";
import {InfoDialogComponent} from "../../shared/dialog/info-dialog.component";

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit,AfterViewInit{
  admins:UserInfo[] = [];
  dataSource= new MatTableDataSource<UserInfo>();
  displayedColumns: string[] = ["username", "name","email","phone","status","role","action"];
  @ViewChild('paginator') paginator!:MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  searchText:any;

  constructor(private infoService:UserInfoService,
              private userService:UserService,
              private auth:AuthService,
              private dialog:MatDialog){
  }

  ngOnInit(): void {
    this.infoService.getAdmins().subscribe(res=>{
      if (res.success) {
        this.admins = res.data;
        console.log(this.admins);
        this.dataSource.data = this.admins;
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

  updateStatus(status:string, id:number) {
    this.admins.forEach(item=>{
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

  deleteAdmin(user:User) {
    if (user.id == 1){
      this.dialog.open(InfoDialogComponent,{
        data:{
          title:"Error",
          message:"You can't delete this admin"
        }
      });
      return;
    }
    this.userService.deleteAdmin(user.id).subscribe(res=>{
      if (res.success) {
        this.admins = this.admins.filter(item=>item.user.id!=user.id);
        this.dataSource.data = this.admins;
        this.setDataSourceAttributes();
      } else {
        alert(res.message);
      }
    });

  }


  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateRole(newRole: string, id: number) {
    this.userService.updateRole(id, newRole).subscribe(res => {
      if (res.success) {
        this.admins.forEach(item => {
          if (item.user.id == id) {
            item.user = res.data;
          }
        });
        this.setDataSourceAttributes();
      }else {
        console.log(res);
        alert(res.message);
      }
    });
  }

  addAdmin() {
    const dialogRef = this.dialog.open(AddAdminDialogComponent, {
      data: this.admins
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.userService.addAdmin(result).subscribe(res=>{
          if (res.success) {
            this.admins.push(res.data);
            this.dataSource.data = this.admins;
            this.setDataSourceAttributes();
          } else {
            alert(res.message);
          }
        });
      }
    });
  }
}
