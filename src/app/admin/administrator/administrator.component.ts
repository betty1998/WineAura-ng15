import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../shared/model/User";
import {StoreManager} from "../../shared/model/StoreManager";
import {UserInfoService} from "../../shared/service/user-info.service";
import {AuthService} from "../../shared/service/auth.service";
import {UserInfo} from "../../shared/model/UserInfo";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

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
              private auth:AuthService,
              private cdr:ChangeDetectorRef){
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
    this.auth.updateUser(id,status).subscribe(res=>{
      if (res.success) {
        this.setDataSourceAttributes();
      } else {
        alert(res.message);
      }
    } );
  }

  deleteAdmin(id: number) {

  }

  getRole(user: User) {
    let adminRole:string="";
    user.roles?.forEach(role=>{
      if (role.type=="Admin") {
        adminRole = role.type;
      }else {
        adminRole = "Manager";
      }
    });
    return adminRole;
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateRole(newRole: string, id: number) {
    this.auth.updateRole(id, newRole).subscribe(res => {
      if (res.success) {
        this.admins.forEach(item => {
          if (item.user.id == id) {
            item.user.roles?.forEach(role => {
              if (role.type != "Customer") {
                role.type = newRole;
              }
            });
          }
        });
      }
    });
  }
}
