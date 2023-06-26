import {Component, Inject, OnInit} from '@angular/core';
import {UserInfoService} from "../../../shared/service/user-info.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit{
  title!:string;
  userInfoId!: number;
  addressForm!: FormGroup;

  constructor(private fb:FormBuilder,
              private userInfoService:UserInfoService,
              private dialogRef:MatDialogRef<AddressDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
    this.title = data.dialogTitle;
    this.userInfoId = data.userInfoId;
  }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      address:["",Validators.required],
      city:["",Validators.required],
      state:["",Validators.required],
      zipcode:["",Validators.required]
    })
  }

}
