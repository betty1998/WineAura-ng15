import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserInfoService} from "../../../shared/service/user-info.service";
import {AuthService} from "../../../shared/service/auth.service";

import {User} from "../../../shared/model/User";
import {UserInfo} from "../../../shared/model/UserInfo";
import {mergeMap} from "rxjs";
import {InfoDialogComponent} from "../../../shared/dialog/info-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit{
  customerForm!: FormGroup;
  user!:User;
  userInfo!:UserInfo;
  userInfoId!:number;
  isAdmin!:boolean;

  constructor(private fb:FormBuilder,
              private auth:AuthService,
              private infoService:UserInfoService,
              private dialog:MatDialog,
              private router:Router,
              private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    // TODO: add membership
    this.customerForm = this.fb.group({
      // username: ['',[Validators.required]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',[Validators.required]],
      phone: ['',[Validators.required]],
      status: [''],
    });
    this.userInfoId = this.route.snapshot.params['id'];
    this.isAdmin=this.route.snapshot.toString().includes('admin');

    this.infoService.getUserInfoById(this.userInfoId).subscribe(res=>{
      if(res.success){
        this.userInfo = res.data;
        this.user = this.userInfo.user;
        this.customerForm.patchValue({
          firstName: this.userInfo.firstName,
          lastName: this.userInfo.lastName,
          email: this.userInfo.email,
          phone: this.userInfo.phone,
          status: this.user.status
        } );
      }
    } );

  }


  updateCustomer() {
    const formValue = this.customerForm.value;
    this.userInfo.firstName = formValue.firstName;
    this.userInfo.lastName = formValue.lastName;
    this.userInfo.email = formValue.email;
    this.userInfo.phone = formValue.phone;
    // update status then update user info, then open dialog
    this.auth.updateUser(this.user?.id,formValue.status).pipe(mergeMap(res=>{
      if(res.success){
        return this.infoService.updateProfile(this.userInfo.id,this.userInfo);
      } else {
        alert(res.message);
        return [];
      }
    })).subscribe(res=>{
      if(res.success){
        this.dialog.open(InfoDialogComponent, {
          data: {
            title: "Update Customer Profile",
            message: "Update customer successfully"
          }
        })
        this.router.navigate(['/admin/customer']).catch();
      } else {
        alert(res.message);
      }
    } );

  }
}
