import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-tracking-number-dialog',
  template: `
    <h1 mat-dialog-title>Tracking Number for shipment</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Tracking number</mat-label>
        <input matInput [(ngModel)]="inputValue" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="inputValue" cdkFocusInitial>Save</button>
      <button mat-button (click)="dialogRef.close()">Cancel</button>
    </div>
  `,
})
export class TrackingNumberDialogComponent {

  inputValue!: string;

  constructor(
    public dialogRef: MatDialogRef<TrackingNumberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

}

