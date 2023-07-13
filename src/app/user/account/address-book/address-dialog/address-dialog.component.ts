import {Component, Inject, OnInit} from '@angular/core';
import {UserInfoService} from "../../../../shared/service/user-info.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddressBook} from "../../../../shared/model/AddressBook";

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit{
  title!:string;
  userInfoId!: number;
  addressForm!: FormGroup;
  address!: AddressBook;

  constructor(private fb:FormBuilder,
              private userInfoService:UserInfoService,
              public dialogRef:MatDialogRef<AddressDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
    this.title = data.dialogTitle;
    this.userInfoId = data.userInfoId;
    this.address = data.address;
  }

  ngOnInit(): void {
    if (this.title == "New Address") {
      this.addressForm = this.fb.group({
        firstName:["",Validators.required],
        lastName:["",Validators.required],
        address1:["",Validators.required],
        address2:"",
        city:["",Validators.required],
        state:["",Validators.required],
        country:["",Validators.required],
        zipcode:["",Validators.required]
      })
    }else if (this.title == "Edit Address") {
      this.addressForm = this.fb.group({
        firstName:[this.address.firstName,Validators.required],
        lastName:[this.address.lastName,Validators.required],
        address1:[this.address.address1,Validators.required],
        address2:this.address.address2,
        city:[this.address.city,Validators.required],
        state:[this.address.state,Validators.required],
        country:[this.address.country,Validators.required],
        zipcode:[this.address.zipcode,Validators.required]
      })
    }
  }


  save() {
    if (this.title == "New Address") {
      const addressBook:AddressBook = {...this.addressForm.value};
      console.log(addressBook);
      this.userInfoService.addAddress(this.userInfoId, addressBook).subscribe(res=>{
        if (res.success) {
          this.userInfoService.userInfo = res.data;
          this.userInfoService.userInfo$.next(res.data);
          this.dialogRef.close();
        } else {
          console.log(res);
          alert(res.message);
        }
      });
    }else if (this.title == "Edit Address") {
      const addressBook:AddressBook = {...this.addressForm.value};
      addressBook.id = this.address.id;
      console.log(addressBook);
      this.userInfoService.editAddress(this.userInfoId, addressBook).subscribe(res=>{
        if (res.success) {
          this.userInfoService.userInfo = res.data;
          this.userInfoService.userInfo$.next(res.data);
          this.dialogRef.close();
        } else {
          console.log(res);
          alert(res.message);
        }
      });
    }
  }
}
