import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserInfo} from "../../../shared/model/UserInfo";
import {AuthService} from "../../../shared/service/auth.service";

@Component({
  selector: 'app-add-admin-dialog',
  template:`
   <h1 mat-dialog-title>Add New Administrator</h1>
  <div mat-dialog-content>
    <form [formGroup]="adminForm">
      <mat-form-field appearance="outline" class="mt-2 me-3">
        <mat-label>Username</mat-label>
        <input matInput placeholder="Username" formControlName="username" required>
        <mat-error *ngIf="adminForm.controls['username'].hasError('exist')">Username already exist</mat-error>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Role</mat-label>
        <mat-select formControlName="role" required>
          <mat-option>No Select</mat-option>
          <mat-option value="Manager">Manager</mat-option>
          <mat-option value="Admin">Admin</mat-option>
        </mat-select>
      </mat-form-field>
      <div mat-dialog-actions>
        <button mat-button (click)="dialogRef.close()">Cancel</button>
        <button mat-button color="primary" (click)="addAdmin()" [disabled]="!adminForm.valid">Add</button>
      </div>
    </form>
  </div>`
})
export class AddAdminDialogComponent {
  adminForm!:FormGroup;

  constructor(private fb:FormBuilder,
              public dialogRef: MatDialogRef<AddAdminDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public admins: UserInfo[],
              public auth: AuthService) {
  }

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      username:[''],
      role:[''],
    })
  }

  addAdmin() {
    const exist = this.admins.some(item=>item.user.username==this.adminForm.value.username);
    if (exist) {
      this.adminForm.controls['username'].setErrors({exist:true});
    }
    console.log(this.adminForm.value);
    this.dialogRef.close(this.adminForm.value);
  }
}

export interface AdminData {
  username: string;
  role: string;
}
