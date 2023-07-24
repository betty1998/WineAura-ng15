import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserInfoService} from "../../../shared/service/user-info.service";
import {UserInfo} from "../../../shared/model/UserInfo";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, switchMap} from "rxjs";
import {DialogRef} from "@angular/cdk/dialog";
import {AddressDialogComponent} from "./address-dialog/address-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddressBook} from "../../../shared/model/AddressBook";
import {ConfirmDialogComponent} from "../../../shared/dialog/confirm-dialog.component";

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit{
  userInfo$=new BehaviorSubject<UserInfo>({} as UserInfo);
  constructor(public userInfoService: UserInfoService,
              private route:ActivatedRoute,
              private dialog: MatDialog,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.userInfoService.userInfo$.subscribe(res=>{
      if (res) {
        this.userInfo$.next(res);
      }
    });
  }


  editAddress(addressBook:AddressBook) {
    this.dialog.open(AddressDialogComponent, {
      data: {
        userInfoId: this.userInfo$.value.id,
        address: addressBook,
        dialogTitle: 'Edit Address',
      },
    });
  }


  addAddress() {
    this.dialog.open(AddressDialogComponent, {
      data: {
        userInfoId: this.userInfo$.value.id,
        dialogTitle: 'New Address',
      },
    });
  }

  deleteAddress(address: AddressBook) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm',
        message: 'Are you sure to delete this address?'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.userInfoService.deleteAddress(this.userInfo$.value.id, address).subscribe(res=>{
          if (res.success) {
            this.userInfoService.userInfo = res.data;
            this.userInfo$.next(res.data);
            this.cdr.detectChanges();
          } else {
            console.log(res);
          }
        })
      }
    });

  }
}
