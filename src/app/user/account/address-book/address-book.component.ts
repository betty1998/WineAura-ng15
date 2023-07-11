import {Component, OnInit} from '@angular/core';
import {UserInfoService} from "../../../shared/service/user-info.service";
import {UserInfo} from "../../../shared/model/UserInfo";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {DialogRef} from "@angular/cdk/dialog";
import {AddressDialogComponent} from "./address-dialog/address-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddressBook} from "../../../shared/model/AddressBook";

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit{
  userInfo!: UserInfo;
  constructor(public userInfoService: UserInfoService,
              private route:ActivatedRoute,
              private dialog: MatDialog) {
    userInfoService.userInfo && route.parent?.paramMap.pipe(switchMap(params =>{
      const id = Number(params.get("id"));
      return userInfoService.getUserInfo(id);
    })).subscribe(res =>{
      if (res.success) {
        userInfoService.userInfo = res.data;
        this.userInfo = res.data;
      } else {
        console.log(res);
      }
    })
  }

  ngOnInit(): void {
    if (this.userInfoService.userInfo) {
      this.userInfo = this.userInfoService.userInfo;
    }
  }


  editAddress(addressBook:AddressBook) {
    this.dialog.open(AddressDialogComponent, {
      data: {
        userInfoId: this.userInfo.id,
        address: addressBook,
        dialogTitle: 'Edit Address',
      },
    });
  }


  addAddress() {
    this.dialog.open(AddressDialogComponent, {
      data: {
        userInfoId: this.userInfo.id,
        dialogTitle: 'New Address',
      },
    });
  }

  deleteAddress(address: AddressBook) {
    this.userInfoService.deleteAddress(this.userInfo.id, address).subscribe(res=>{
      if (res.success) {
        this.userInfoService.userInfo = res.data;
      } else {
        console.log(res);
      }
    })
  }
}
